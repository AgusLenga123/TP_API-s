/**
 * SEED — Datos iniciales para la liga de baloncesto
 * Ejecutar UNA sola vez: node seed.js
 *
 * Crea:
 *  - 1 administrador
 *  - 8 equipos con ~10 jugadores cada uno (~80 jugadores)
 *  - Temporada completa: 28 partidos de fase regular + 4 semifinales + 2 finales
 *    (mayoría finalizados, algunos pendientes)
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Admin   = require('./src/models/Admin.model');
const Equipo  = require('./src/models/Equipo.model');
const Jugador = require('./src/models/Jugador.model');
const Partido = require('./src/models/Partido.model');

/* ─────────────────── helpers ─────────────────── */

const aplicarEstadisticas = (local, visitante, pLocal, pVisitante) => {
  local.estadisticas.partidosJugados     += 1;
  local.estadisticas.tantosAFavor        += pLocal;
  local.estadisticas.tantosEnContra      += pVisitante;

  visitante.estadisticas.partidosJugados += 1;
  visitante.estadisticas.tantosAFavor    += pVisitante;
  visitante.estadisticas.tantosEnContra  += pLocal;

  if (pLocal > pVisitante) {
    local.estadisticas.partidosGanados     += 1;
    local.estadisticas.puntos              += 3;
    visitante.estadisticas.partidosPerdidos += 1;
  } else if (pLocal < pVisitante) {
    visitante.estadisticas.partidosGanados += 1;
    visitante.estadisticas.puntos          += 3;
    local.estadisticas.partidosPerdidos    += 1;
  } else {
    local.estadisticas.partidosEmpatados     += 1;
    local.estadisticas.puntos               += 1;
    visitante.estadisticas.partidosEmpatados += 1;
    visitante.estadisticas.puntos           += 1;
  }
};

/* ─────────────────── seed ─────────────────── */

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Limpiar colecciones
    await Promise.all([
      Admin.deleteMany(),
      Equipo.deleteMany(),
      Jugador.deleteMany(),
      Partido.deleteMany(),
    ]);
    console.log('🗑️  Colecciones limpiadas');

    /* ── Admin ── */
    const salt = await bcrypt.genSalt(10);
    await Admin.collection.insertOne({
      usuario:      'admin',
      passwordHash: await bcrypt.hash('Admin1234', salt),
      createdAt:    new Date(),
      updatedAt:    new Date(),
    });
    console.log('👤 Admin creado  →  usuario: admin / password: Admin1234');

    /* ── Equipos ── */
    const equiposData = [
      { nombre: 'Los Cóndores',       entrenador: 'Roberto Sánchez'   },
      { nombre: 'Águilas del Sur',     entrenador: 'María González'    },
      { nombre: 'Tigres FC',           entrenador: 'Carlos Méndez'     },
      { nombre: 'Halcones Azules',     entrenador: 'Laura Fernández'   },
      { nombre: 'Leones de Oro',       entrenador: 'Diego Herrera'     },
      { nombre: 'Panteras Negras',     entrenador: 'Sofía Romero'      },
      { nombre: 'Toros del Norte',     entrenador: 'Mauricio Vargas'   },
      { nombre: 'Lobos de la Patagonia', entrenador: 'Valentina Cruz'  },
    ];
    const equipos = await Equipo.insertMany(equiposData);
    console.log(`🏀 ${equipos.length} equipos creados`);

    /* ── Jugadores ── */
    const categorias = ['Sub-13', 'Sub-15', 'Sub-17', 'Mayor'];

    const jugadoresData = [
      /* ── Equipo 0: Los Cóndores ── */
      { nombre: 'Juan',      apellido: 'Pérez',      categoria: 'Sub-17', equipo: equipos[0]._id },
      { nombre: 'Lucas',     apellido: 'Rodríguez',  categoria: 'Sub-17', equipo: equipos[0]._id },
      { nombre: 'Tomás',     apellido: 'García',     categoria: 'Sub-15', equipo: equipos[0]._id },
      { nombre: 'Ezequiel',  apellido: 'Navarro',    categoria: 'Mayor',  equipo: equipos[0]._id },
      { nombre: 'Rodrigo',   apellido: 'Suárez',     categoria: 'Mayor',  equipo: equipos[0]._id },
      { nombre: 'Martín',    apellido: 'Acosta',     categoria: 'Sub-17', equipo: equipos[0]._id },
      { nombre: 'Leandro',   apellido: 'Campos',     categoria: 'Sub-15', equipo: equipos[0]._id },
      { nombre: 'Franco',    apellido: 'Ríos',       categoria: 'Mayor',  equipo: equipos[0]._id },
      { nombre: 'Sebastián', apellido: 'Vega',       categoria: 'Sub-17', equipo: equipos[0]._id },
      { nombre: 'Matías',    apellido: 'Blanco',     categoria: 'Sub-13', equipo: equipos[0]._id },

      /* ── Equipo 1: Águilas del Sur ── */
      { nombre: 'Mateo',     apellido: 'López',      categoria: 'Sub-17', equipo: equipos[1]._id },
      { nombre: 'Benjamín',  apellido: 'Martínez',   categoria: 'Sub-17', equipo: equipos[1]._id },
      { nombre: 'Emilio',    apellido: 'Silva',       categoria: 'Sub-15', equipo: equipos[1]._id },
      { nombre: 'Cristian',  apellido: 'Medina',     categoria: 'Mayor',  equipo: equipos[1]._id },
      { nombre: 'Pablo',     apellido: 'Castillo',   categoria: 'Mayor',  equipo: equipos[1]._id },
      { nombre: 'Alexis',    apellido: 'Ramos',      categoria: 'Sub-17', equipo: equipos[1]._id },
      { nombre: 'Hernán',    apellido: 'Peña',       categoria: 'Sub-13', equipo: equipos[1]._id },
      { nombre: 'Gonzalo',   apellido: 'Ortiz',      categoria: 'Mayor',  equipo: equipos[1]._id },
      { nombre: 'Claudio',   apellido: 'Reyes',      categoria: 'Sub-15', equipo: equipos[1]._id },
      { nombre: 'Fernando',  apellido: 'Jiménez',    categoria: 'Sub-17', equipo: equipos[1]._id },

      /* ── Equipo 2: Tigres FC ── */
      { nombre: 'Santiago',  apellido: 'Torres',     categoria: 'Sub-17', equipo: equipos[2]._id },
      { nombre: 'Nicolás',   apellido: 'Ramírez',    categoria: 'Sub-17', equipo: equipos[2]._id },
      { nombre: 'Ignacio',   apellido: 'Herrera',    categoria: 'Sub-15', equipo: equipos[2]._id },
      { nombre: 'Damián',    apellido: 'Fuentes',    categoria: 'Mayor',  equipo: equipos[2]._id },
      { nombre: 'Sergio',    apellido: 'Arias',      categoria: 'Mayor',  equipo: equipos[2]._id },
      { nombre: 'Gustavo',   apellido: 'Paredes',    categoria: 'Sub-17', equipo: equipos[2]._id },
      { nombre: 'Ariel',     apellido: 'Molina',     categoria: 'Sub-13', equipo: equipos[2]._id },
      { nombre: 'Nahuel',    apellido: 'Vera',       categoria: 'Mayor',  equipo: equipos[2]._id },
      { nombre: 'Esteban',   apellido: 'Soto',       categoria: 'Sub-15', equipo: equipos[2]._id },
      { nombre: 'Patricio',  apellido: 'Cabrera',    categoria: 'Sub-17', equipo: equipos[2]._id },

      /* ── Equipo 3: Halcones Azules ── */
      { nombre: 'Valentín',  apellido: 'Castro',     categoria: 'Sub-17', equipo: equipos[3]._id },
      { nombre: 'Agustín',   apellido: 'Ríos',       categoria: 'Sub-17', equipo: equipos[3]._id },
      { nombre: 'Facundo',   apellido: 'Morales',    categoria: 'Sub-15', equipo: equipos[3]._id },
      { nombre: 'Leonardo',  apellido: 'Rojas',      categoria: 'Mayor',  equipo: equipos[3]._id },
      { nombre: 'Maximiliano', apellido: 'Ibáñez',   categoria: 'Mayor',  equipo: equipos[3]._id },
      { nombre: 'Julián',    apellido: 'Delgado',    categoria: 'Sub-17', equipo: equipos[3]._id },
      { nombre: 'Ramiro',    apellido: 'Cáceres',    categoria: 'Sub-13', equipo: equipos[3]._id },
      { nombre: 'Iván',      apellido: 'Alvarado',   categoria: 'Mayor',  equipo: equipos[3]._id },
      { nombre: 'Axel',      apellido: 'Carrasco',   categoria: 'Sub-15', equipo: equipos[3]._id },
      { nombre: 'Bruno',     apellido: 'Espinoza',   categoria: 'Sub-17', equipo: equipos[3]._id },

      /* ── Equipo 4: Leones de Oro ── */
      { nombre: 'Marcos',    apellido: 'Guerrero',   categoria: 'Mayor',  equipo: equipos[4]._id },
      { nombre: 'Adrián',    apellido: 'Flores',     categoria: 'Sub-17', equipo: equipos[4]._id },
      { nombre: 'René',      apellido: 'Benítez',    categoria: 'Sub-15', equipo: equipos[4]._id },
      { nombre: 'Osvaldo',   apellido: 'Montoya',    categoria: 'Mayor',  equipo: equipos[4]._id },
      { nombre: 'Hipólito',  apellido: 'Contreras',  categoria: 'Sub-17', equipo: equipos[4]._id },
      { nombre: 'Rubén',     apellido: 'Pizarro',    categoria: 'Mayor',  equipo: equipos[4]._id },
      { nombre: 'Álvaro',    apellido: 'Tapia',      categoria: 'Sub-13', equipo: equipos[4]._id },
      { nombre: 'César',     apellido: 'Valenzuela', categoria: 'Sub-15', equipo: equipos[4]._id },
      { nombre: 'Eduardo',   apellido: 'Salas',      categoria: 'Sub-17', equipo: equipos[4]._id },
      { nombre: 'Rodrigo',   apellido: 'Sandoval',   categoria: 'Mayor',  equipo: equipos[4]._id },

      /* ── Equipo 5: Panteras Negras ── */
      { nombre: 'Héctor',    apellido: 'Mendoza',    categoria: 'Mayor',  equipo: equipos[5]._id },
      { nombre: 'Gerardo',   apellido: 'Ruiz',       categoria: 'Sub-17', equipo: equipos[5]._id },
      { nombre: 'Omar',      apellido: 'Soria',      categoria: 'Sub-15', equipo: equipos[5]._id },
      { nombre: 'Felipe',    apellido: 'Aguilar',    categoria: 'Mayor',  equipo: equipos[5]._id },
      { nombre: 'Andrés',    apellido: 'Prieto',     categoria: 'Sub-17', equipo: equipos[5]._id },
      { nombre: 'Ignacio',   apellido: 'Vidal',      categoria: 'Mayor',  equipo: equipos[5]._id },
      { nombre: 'Tomás',     apellido: 'Leal',       categoria: 'Sub-13', equipo: equipos[5]._id },
      { nombre: 'Cristóbal', apellido: 'Mejía',      categoria: 'Sub-15', equipo: equipos[5]._id },
      { nombre: 'Álvaro',    apellido: 'Fuentes',    categoria: 'Sub-17', equipo: equipos[5]._id },
      { nombre: 'Diego',     apellido: 'Sepúlveda',  categoria: 'Mayor',  equipo: equipos[5]._id },

      /* ── Equipo 6: Toros del Norte ── */
      { nombre: 'Ricardo',   apellido: 'Vargas',     categoria: 'Mayor',  equipo: equipos[6]._id },
      { nombre: 'Joaquín',   apellido: 'Muñoz',      categoria: 'Sub-17', equipo: equipos[6]._id },
      { nombre: 'Emiliano',  apellido: 'Gallardo',   categoria: 'Sub-15', equipo: equipos[6]._id },
      { nombre: 'Claudio',   apellido: 'Ponce',      categoria: 'Mayor',  equipo: equipos[6]._id },
      { nombre: 'Gustavo',   apellido: 'Espejo',     categoria: 'Sub-17', equipo: equipos[6]._id },
      { nombre: 'Patricio',  apellido: 'Álvarez',    categoria: 'Mayor',  equipo: equipos[6]._id },
      { nombre: 'Rodolfo',   apellido: 'Correa',     categoria: 'Sub-13', equipo: equipos[6]._id },
      { nombre: 'Félix',     apellido: 'Guzmán',     categoria: 'Sub-15', equipo: equipos[6]._id },
      { nombre: 'Antonio',   apellido: 'Bravo',      categoria: 'Sub-17', equipo: equipos[6]._id },
      { nombre: 'Ernesto',   apellido: 'Figueroa',   categoria: 'Mayor',  equipo: equipos[6]._id },

      /* ── Equipo 7: Lobos de la Patagonia ── */
      { nombre: 'Tobías',    apellido: 'Quiroga',    categoria: 'Mayor',  equipo: equipos[7]._id },
      { nombre: 'Lautaro',   apellido: 'Villareal',  categoria: 'Sub-17', equipo: equipos[7]._id },
      { nombre: 'Thiago',    apellido: 'Mansilla',   categoria: 'Sub-15', equipo: equipos[7]._id },
      { nombre: 'Bautista',  apellido: 'Montes',     categoria: 'Mayor',  equipo: equipos[7]._id },
      { nombre: 'Santino',   apellido: 'Ferreyra',   categoria: 'Sub-17', equipo: equipos[7]._id },
      { nombre: 'Luciano',   apellido: 'Córdoba',    categoria: 'Mayor',  equipo: equipos[7]._id },
      { nombre: 'Delfín',    apellido: 'Palacios',   categoria: 'Sub-13', equipo: equipos[7]._id },
      { nombre: 'Enzo',      apellido: 'Godoy',      categoria: 'Sub-15', equipo: equipos[7]._id },
      { nombre: 'Máximo',    apellido: 'Serrano',    categoria: 'Sub-17', equipo: equipos[7]._id },
      { nombre: 'Camilo',    apellido: 'Reinoso',    categoria: 'Mayor',  equipo: equipos[7]._id },
    ];

    const jugadores = await Jugador.insertMany(jugadoresData);

    // Asignar jugadores a cada equipo
    for (const equipo of equipos) {
      await Equipo.findByIdAndUpdate(equipo._id, {
        jugadores: jugadores
          .filter((j) => j.equipo.equals(equipo._id))
          .map((j) => j._id),
      });
    }
    console.log(`👥 ${jugadores.length} jugadores creados y asignados`);

    // Cargar equipos frescos para actualizar estadísticas
    const e = await Promise.all(equipos.map((eq) => Equipo.findById(eq._id)));
    const [e0, e1, e2, e3, e4, e5, e6, e7] = e;

    /* ────────────────────────────────────────────────────────────
       FASE REGULAR — todos los equipos se enfrentan entre sí
       (round-robin simple, 28 partidos)
       Fechas: 2025-03-01 → 2025-05-18
       25 finalizados · 3 pendientes
    ──────────────────────────────────────────────────────────── */

    const lugares = [
      'Gimnasio Municipal Norte',
      'Polideportivo Sur',
      'Arena Central',
      'Complejo Deportivo Oeste',
      'Estadio Cubierto Este',
    ];
    const horarios = ['15:00', '16:30', '17:00', '18:00', '19:00', '20:00'];

    // Helper para crear partido finalizado y aplicar estadísticas
    const crearPartidoFinalizado = async (
      local, visitante, fecha, horario, lugar, pLocal, pVisitante
    ) => {
      await Partido.create({
        equipoLocal:     local._id,
        equipoVisitante: visitante._id,
        fecha:           new Date(fecha),
        horario,
        lugar,
        resultado:       { puntosLocal: pLocal, puntosVisitante: pVisitante },
        finalizado:      true,
      });
      aplicarEstadisticas(local, visitante, pLocal, pVisitante);
    };

    // Helper para crear partido pendiente
    const crearPartidoPendiente = async (local, visitante, fecha, horario, lugar) => {
      await Partido.create({
        equipoLocal:     local._id,
        equipoVisitante: visitante._id,
        fecha:           new Date(fecha),
        horario,
        lugar,
      });
    };

    /* ── Jornada 1 ── 2025-03-01 */
    await crearPartidoFinalizado(e0, e1, '2025-03-01', horarios[3], lugares[0], 88, 74);
    await crearPartidoFinalizado(e2, e3, '2025-03-01', horarios[4], lugares[1], 65, 72);
    await crearPartidoFinalizado(e4, e5, '2025-03-01', horarios[2], lugares[2], 91, 80);
    await crearPartidoFinalizado(e6, e7, '2025-03-01', horarios[1], lugares[3], 77, 85);

    /* ── Jornada 2 ── 2025-03-08 */
    await crearPartidoFinalizado(e0, e2, '2025-03-08', horarios[0], lugares[0], 102, 95);
    await crearPartidoFinalizado(e1, e4, '2025-03-08', horarios[3], lugares[2], 83, 78);
    await crearPartidoFinalizado(e3, e6, '2025-03-08', horarios[5], lugares[4], 70, 70);
    await crearPartidoFinalizado(e5, e7, '2025-03-08', horarios[2], lugares[1], 68, 90);

    /* ── Jornada 3 ── 2025-03-15 */
    await crearPartidoFinalizado(e0, e3, '2025-03-15', horarios[4], lugares[3], 79, 65);
    await crearPartidoFinalizado(e1, e5, '2025-03-15', horarios[1], lugares[0], 74, 88);
    await crearPartidoFinalizado(e2, e6, '2025-03-15', horarios[3], lugares[2], 85, 81);
    await crearPartidoFinalizado(e4, e7, '2025-03-15', horarios[0], lugares[1], 93, 89);

    /* ── Jornada 4 ── 2025-03-22 */
    await crearPartidoFinalizado(e0, e4, '2025-03-22', horarios[5], lugares[4], 76, 98);
    await crearPartidoFinalizado(e1, e6, '2025-03-22', horarios[2], lugares[0], 81, 67);
    await crearPartidoFinalizado(e2, e7, '2025-03-22', horarios[3], lugares[3], 88, 77);
    await crearPartidoFinalizado(e3, e5, '2025-03-22', horarios[1], lugares[2], 59, 64);

    /* ── Jornada 5 ── 2025-03-29 */
    await crearPartidoFinalizado(e0, e5, '2025-03-29', horarios[4], lugares[1], 95, 82);
    await crearPartidoFinalizado(e1, e7, '2025-03-29', horarios[3], lugares[4], 71, 88);
    await crearPartidoFinalizado(e2, e4, '2025-03-29', horarios[0], lugares[0], 84, 79);
    await crearPartidoFinalizado(e3, e6, '2025-03-29', horarios[2], lugares[3], 66, 73);

    /* ── Jornada 6 ── 2025-04-05 */
    await crearPartidoFinalizado(e0, e6, '2025-04-05', horarios[1], lugares[2], 112, 100);
    await crearPartidoFinalizado(e1, e3, '2025-04-05', horarios[5], lugares[1], 90, 78);
    await crearPartidoFinalizado(e4, e6, '2025-04-05', horarios[3], lugares[0], 87, 72);
    await crearPartidoFinalizado(e5, e6, '2025-04-05', horarios[2], lugares[4], 78, 66);

    /* ── Jornada 7 ── 2025-04-12 */
    await crearPartidoFinalizado(e0, e7, '2025-04-12', horarios[4], lugares[3], 98, 101);
    await crearPartidoFinalizado(e2, e5, '2025-04-12', horarios[1], lugares[0], 73, 68);

    // Guardar estadísticas acumuladas de fase regular
    await Promise.all(e.map((eq) => eq.save()));
    console.log('📅 26 partidos de fase regular creados');

    /* ────────────────────────────────────────────────────────────
       SEMIFINALES — 2025-05-03 y 2025-05-04
    ──────────────────────────────────────────────────────────── */

    await crearPartidoFinalizado(e0, e4, '2025-05-03', '18:00', lugares[2], 94, 87);
    await crearPartidoFinalizado(e2, e7, '2025-05-04', '19:00', lugares[4], 81, 76);
    await Promise.all(e.map((eq) => eq.save()));
    console.log('🏆 2 semifinales creadas');

    /* ────────────────────────────────────────────────────────────
       FINAL — pendiente (2025-05-17)
    ──────────────────────────────────────────────────────────── */
    await crearPartidoPendiente(e0, e2, '2025-05-17', '19:00', 'Arena Central');
    console.log('🎯 1 final pendiente creada');

    /* ────────────────────────────────────────────────────────────
       PARTIDOS PENDIENTES adicionales (jornadas futuras)
    ──────────────────────────────────────────────────────────── */
    await crearPartidoPendiente(e1, e2, '2025-06-07', '16:00', lugares[0]);
    await crearPartidoPendiente(e3, e7, '2025-06-07', '17:30', lugares[1]);
    await crearPartidoPendiente(e5, e4, '2025-06-14', '18:00', lugares[2]);
    console.log('📌 3 partidos futuros pendientes creados');

    /* ─────── resumen final ─────── */
    console.log('\n─────────────────────────────────────────────────');
    console.log('🎉 Seed completado exitosamente');
    console.log('   Admin     →  usuario: admin  /  password: Admin1234');
    console.log(`   Equipos   →  ${equipos.length}`);
    console.log(`   Jugadores →  ${jugadores.length}`);
    const totalPartidos = await Partido.countDocuments();
    const finalizados   = await Partido.countDocuments({ finalizado: true });
    console.log(`   Partidos  →  ${totalPartidos} total  (${finalizados} finalizados · ${totalPartidos - finalizados} pendientes)`);
    console.log('─────────────────────────────────────────────────\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seed:', error.message);
    console.error(error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seed();
