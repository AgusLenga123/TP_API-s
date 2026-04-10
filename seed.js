/**
 * SEED — Datos iniciales para la liga de baloncesto
 * Ejecutar UNA sola vez: node seed.js
 *
 * Crea:
 *  - 1 administrador
 *  - 4 equipos con jugadores
 *  - 4 partidos (2 con resultado cargado)
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Admin = require('./src/models/Admin.model');
const Equipo = require('./src/models/Equipo.model');
const Jugador = require('./src/models/Jugador.model');
const Partido = require('./src/models/Partido.model');

const aplicarEstadisticas = (local, visitante, pLocal, pVisitante) => {
  local.estadisticas.partidosJugados += 1;
  local.estadisticas.tantosAFavor += pLocal;
  local.estadisticas.tantosEnContra += pVisitante;

  visitante.estadisticas.partidosJugados += 1;
  visitante.estadisticas.tantosAFavor += pVisitante;
  visitante.estadisticas.tantosEnContra += pLocal;

  if (pLocal > pVisitante) {
    local.estadisticas.partidosGanados += 1;
    local.estadisticas.puntos += 3;
    visitante.estadisticas.partidosPerdidos += 1;
  } else if (pLocal < pVisitante) {
    visitante.estadisticas.partidosGanados += 1;
    visitante.estadisticas.puntos += 3;
    local.estadisticas.partidosPerdidos += 1;
  } else {
    local.estadisticas.partidosEmpatados += 1;
    local.estadisticas.puntos += 1;
    visitante.estadisticas.partidosEmpatados += 1;
    visitante.estadisticas.puntos += 1;
  }
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    await Promise.all([
      Admin.deleteMany(),
      Equipo.deleteMany(),
      Jugador.deleteMany(),
      Partido.deleteMany(),
    ]);
    console.log('🗑️  Colecciones limpiadas');

    const salt = await bcrypt.genSalt(10);
    const admin = new Admin({
      usuario: 'admin',
      passwordHash: await bcrypt.hash('Admin1234', salt),
    });
    await Admin.collection.insertOne({
      usuario: admin.usuario,
      passwordHash: admin.passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('👤 Admin creado  →  usuario: admin / password: Admin1234');

    const equiposData = [
      { nombre: 'Los Cóndores', entrenador: 'Roberto Sánchez' },
      { nombre: 'Águilas del Sur', entrenador: 'María González' },
      { nombre: 'Tigres FC', entrenador: 'Carlos Méndez' },
      { nombre: 'Halcones Azules', entrenador: 'Laura Fernández' },
    ];
    const equipos = await Equipo.insertMany(equiposData);
    console.log(`🏀 ${equipos.length} equipos creados`);

    const jugadoresData = [
      { nombre: 'Juan', apellido: 'Pérez', categoria: 'Sub-17', equipo: equipos[0]._id },
      { nombre: 'Lucas', apellido: 'Rodríguez', categoria: 'Sub-17', equipo: equipos[0]._id },
      { nombre: 'Tomás', apellido: 'García', categoria: 'Sub-15', equipo: equipos[0]._id },
      { nombre: 'Mateo', apellido: 'López', categoria: 'Sub-17', equipo: equipos[1]._id },
      { nombre: 'Benjamín', apellido: 'Martínez', categoria: 'Sub-17', equipo: equipos[1]._id },
      { nombre: 'Emilio', apellido: 'Silva', categoria: 'Sub-15', equipo: equipos[1]._id },
      { nombre: 'Santiago', apellido: 'Torres', categoria: 'Sub-17', equipo: equipos[2]._id },
      { nombre: 'Nicolás', apellido: 'Ramírez', categoria: 'Sub-17', equipo: equipos[2]._id },
      { nombre: 'Ignacio', apellido: 'Herrera', categoria: 'Sub-15', equipo: equipos[2]._id },
      { nombre: 'Valentín', apellido: 'Castro', categoria: 'Sub-17', equipo: equipos[3]._id },
      { nombre: 'Agustín', apellido: 'Ríos', categoria: 'Sub-17', equipo: equipos[3]._id },
      { nombre: 'Facundo', apellido: 'Morales', categoria: 'Sub-15', equipo: equipos[3]._id },
    ];
    const jugadores = await Jugador.insertMany(jugadoresData);

    for (const equipo of equipos) {
      await Equipo.findByIdAndUpdate(equipo._id, {
        jugadores: jugadores.filter((j) => j.equipo.equals(equipo._id)).map((j) => j._id),
      });
    }
    console.log(`👥 ${jugadores.length} jugadores creados y asignados`);

    const [e0, e1, e2, e3] = await Promise.all(equipos.map((e) => Equipo.findById(e._id)));

    await Partido.create({
      equipoLocal: e0._id,
      equipoVisitante: e1._id,
      fecha: new Date('2025-05-10'),
      horario: '16:00',
      lugar: 'Gimnasio Municipal Norte',
      resultado: { puntosLocal: 85, puntosVisitante: 70 },
      finalizado: true,
    });
    aplicarEstadisticas(e0, e1, 85, 70);

    await Partido.create({
      equipoLocal: e2._id,
      equipoVisitante: e3._id,
      fecha: new Date('2025-05-12'),
      horario: '18:00',
      lugar: 'Polideportivo Sur',
      resultado: { puntosLocal: 60, puntosVisitante: 60 },
      finalizado: true,
    });
    aplicarEstadisticas(e2, e3, 60, 60);

    await Promise.all([e0.save(), e1.save(), e2.save(), e3.save()]);

    await Partido.create({
      equipoLocal: e1._id,
      equipoVisitante: e2._id,
      fecha: new Date('2025-06-01'),
      horario: '17:00',
      lugar: 'Gimnasio Municipal Norte',
    });

    await Partido.create({
      equipoLocal: e3._id,
      equipoVisitante: e0._id,
      fecha: new Date('2025-06-05'),
      horario: '19:00',
      lugar: 'Polideportivo Sur',
    });

    console.log('📅 4 partidos creados (2 finalizados, 2 pendientes)');
    console.log('\n─────────────────────────────────────────');
    console.log('🎉 Seed completado exitosamente');
    console.log('   Admin →  usuario: admin  /  password: Admin1234');
    console.log('─────────────────────────────────────────\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seed:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seed();
