import constant from './constant';

export default function(links = []) {
  let nDim,
    nodes = [],
    id = (node => node.index),        // accessor: node unique id
    length = (link => 30),            // accessor: number
    elasticity = (link => 0.8);       // accessor: number between 0 and 1

  function force(alpha) {
    for (let i = 0; i < links.length; i++) {
      const link = links[i],
        dx = link.target.x - link.source.x,
        dy = (link.target.y - link.source.y) || 0,
        dz = (link.target.z - link.source.z) || 0,
        d = distance(dx, dy, dz);

      const linkLen = length(link);
      if (d <= linkLen) continue; // Elastic not extended, no effect

      const strength = alpha * elasticity(link) * (d - linkLen);

      // Move only one side if opposite node is fixed
      const bias = link.source.fx != null ? 0 : link.target.fx != null ? 1 : 0.5;

      const srcAcceleration = strength * bias;
      const tgtAcceleration = strength * (1 - bias);

      link.source.vx += dx / d * srcAcceleration;
      link.target.vx -= dx / d * tgtAcceleration;
      if (nDim > 1) {
        link.source.vy += dy / d * srcAcceleration;
        link.target.vy -= dy / d * tgtAcceleration;
      }
      if (nDim > 2) {
        link.source.vz += dz / d * srcAcceleration;
        link.target.vz -= dz / d * tgtAcceleration;
      }
    }
  }

  function initialize() {
    const nodesById = new Map(nodes.map((d, i) => [id(d, i, nodes), d]));
    links.forEach(link => {
      if (typeof link.source !== "object") link.source = nodesById.get(link.source) || link.source;
      if (typeof link.target !== "object") link.target = nodesById.get(link.target) || link.target;
    });
  }

  force.initialize = function(initNodes, ...args) {
    nodes = initNodes;
    nDim = args.find(arg => [1, 2, 3].includes(arg)) || 2;
    initialize();
  };

  force.links = function(_) {
    return arguments.length ? (links = _, initialize(), force) : links;
  };

  force.id = function(_) {
    return arguments.length ? (id = _, force) : id;
  };

  force.length = function(_) {
    return arguments.length ? (length = typeof _ === 'function' ? _ : constant(+_), force) : length;
  };

  force.elasticity = function(_) {
    return arguments.length ? (elasticity = typeof _ === 'function' ? _ : constant(+_), force) : elasticity;
  };

  return force;
}

//

function distance(x, y = 0, z = 0) {
  return Math.sqrt(x*x + y*y + z*z);
}