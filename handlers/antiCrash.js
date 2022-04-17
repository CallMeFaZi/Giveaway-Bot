module.exports = async (client) => {
  client.logger(`Starting AntiCrash`.bold.yellow);

  process.on('multipleResolves', (type, promise, reason) => { 
    console.log('=== [antiCrash] :: [multipleResolves] :: [start] ==='.yellow.dim);

    console.log('=== [antiCrash] :: [multipleResolves] :: [end] ==='.yellow.dim);
  });
  process.on('unhandledRejection', (reason, promise) => { 
    console.log('=== [antiCrash] :: [unhandledRejection] :: [start] ==='.yellow.dim);
    console.log(reason);
    console.log('=== [antiCrash] :: [unhandledRejection] :: [end] ==='.yellow.dim);
  });
  process.on('rejectionHandled', (promise) => { 
    console.log('=== [antiCrash] :: [rejectionHandled] :: [start] ==='.yellow.dim);
    console.log(promise);
    console.log('=== [antiCrash] :: [rejectionHandled] :: [end] ==='.yellow.dim);
  })
  process.on("uncaughtException", (err, origin) => { 
    console.log('=== [antiCrash] :: [uncaughtException] :: [start] ==='.yellow.dim);
    console.log(err);
    console.log('=== [antiCrash] :: [uncaughtException] :: [end] ==='.yellow.dim);
  });
  process.on('uncaughtExceptionMonitor', (err, origin) => { 
    console.log('=== [antiCrash] :: [uncaughtExceptionMonitor] :: [start] ==='.yellow.dim);
    console.log(err);
    console.log('=== [antiCrash] :: [uncaughtExceptionMonitor] :: [end] ==='.yellow.dim);
  });
  
  client.logger(`AntiCrash Started`.brightGreen);
};