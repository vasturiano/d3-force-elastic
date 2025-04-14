d3.forceElastic
===============

[![NPM package][npm-img]][npm-url]
[![Build Size][build-size-img]][build-size-url]
[![NPM Downloads][npm-downloads-img]][npm-downloads-url]

A spring-like force type that attracts nodes when their link is extended beyond its length at rest. The force intensity follows [Hooke's law](https://en.wikipedia.org/wiki/Hooke%27s_law) and is proportional to the extension distance. For distances less than the link's length, no force is applied.

The intensity of the attraction force between two nodes is determined by the extension distance (`D`), the elasticity of the link (`E`) and the simulation alpha (`A`), using the following formula: `A*E*D`.

This force plugin is designed to be used with the [d3-force](https://github.com/d3/d3-force) simulation engine. It is also compatible with [d3-force-3d](https://github.com/vasturiano/d3-force-3d) and can function in a one, two (default) or three-dimensional space.

## Quick start

```js
import d3ForceElastic from 'd3-force-elastic';
```
or using a *script* tag
```html
<script src="//cdn.jsdelivr.net/npm/d3-force-elastic"></script>
```
then
```js
d3.forceSimulation()
  .nodes(<myNodes>)
  .force('elastic', d3.forceElastic()
    .links(<myLinks>)
    .elasticity(0.8)   
  );
```

## API reference

| Method                                       | Description                                                                                                                                                                                                                                                                                                                         |   Default    |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:------------:|
| <b>links</b>([<i>array</i>])                 | Getter/setter for the list of links connecting nodes. Each link should follow the syntax: `{source: <node-id or node-object>, target: <node-id or node-object>}`.                                                                                                                                                                   |      []      |
| <b>id</b>([<i>fn</i>])                       | Getter/setter for the node object unique id accessor function, used by links to reference nodes.                                                                                                                                                                                                                                    | `node.index` |
| <b>distance</b>([<i>num</i> or <i>fn</i>])   | Getter/setter for the link distance accessor function (`fn(link)`) or a constant (`num`) for all links. A link's distance determines the natural length of the spring at rest (not extended), after which an attraction force will be applied.                                                                                      |      30      |
| <b>elasticity</b>([<i>num</i> or <i>fn</i>]) | Getter/setter for the link elasticity accessor function (`fn(link)`) or a constant (`num`) for all links. A link's elasticity determines the stiffness of the extending spring and how strongly the attractive force between two nodes is applied to them. A value of *1* represents unity, while a *0* means no force interaction. |     0.8      |

## Giving Back

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=L398E7PKP47E8&currency_code=USD&source=url) If this project has helped you and you'd like to contribute back, you can always [buy me a ☕](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=L398E7PKP47E8&currency_code=USD&source=url)!


[npm-img]: https://img.shields.io/npm/v/d3-force-elastic
[npm-url]: https://npmjs.org/package/d3-force-elastic
[build-size-img]: https://img.shields.io/bundlephobia/minzip/d3-force-elastic
[build-size-url]: https://bundlephobia.com/result?p=d3-force-elastic
[npm-downloads-img]: https://img.shields.io/npm/dt/d3-force-elastic
[npm-downloads-url]: https://www.npmtrends.com/d3-force-elastic
