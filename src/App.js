import React from 'react';
import Peer from 'peerjs';

const childProcess = require('child_process');

function runScript(scriptPath, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    let invoked = false;

    let process = childProcess.fork(scriptPath, ['--port 9000', '--key peerjs']);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', err => {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', code => {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}

// Now we can run a script and invoke a callback when complete, e.g.
runScript('./node_modules/peer/bin/peerjs', err => {
    if (err) throw err;
    console.log('started p2p server!');
});

const peer = new Peer('banana_nebuna123' ,{
  key: 'peerjs',
  port: 9000,
  host: '127.0.0.1',
  secure: false,
  //path: '/home/eugen/Documents/scripts/ReactProjects/ShareLife/node_modules/peer/bin/peerjs'
}); 

function App() {
  
  return (
    <>
      <h1>
        hello, world!
      </h1>
    </>
  );
}

export default App;
