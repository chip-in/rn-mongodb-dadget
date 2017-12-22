import { ResourceNode } from '@chip-in/resource-node';
import Dadget from '@chip-in/dadget';

if(!process.env.CORE_SERVER){
  console.error("CORE_SERVER required");
  process.exit();
}
if(!process.env.RN_NAME){
  console.error("RN_NAME required");
  process.exit();
}

let node = new ResourceNode(process.env.CORE_SERVER, process.env.RN_NAME);
Dadget.registerServiceClasses(node);
node.start().then(() => {
  function sigHandle() {
    node.stop().then(()=>{
      process.exit()
    })
  }
  process.on('SIGINT', sigHandle);
  process.on('SIGTERM', sigHandle);
})
