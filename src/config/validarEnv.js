const VARIABLES_REQUERIDAS = ['MONGODB_URI', 'JWT_SECRET'];

const validarEnv = () => {
    const faltantes = VARIABLES_REQUERIDAS.filter((v) => !process.env[v]);

    if (faltantes.length > 0) {
        console.error(
            `\n❌ Error: Faltan las siguientes variables de entorno:\n   ${faltantes.join(', ')}\n\n` +
            `   Copiá el archivo .env.example a .env y completá los valores.\n`
        );
        process.exit(1);
    }
};

module.exports = validarEnv;
