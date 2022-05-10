import {KrokiRenderer} from "./lib/rendering/KrokiRenderer";
import {Renderer} from "./lib/rendering/Renderer";
import {MathJaxRenderer} from "./lib/rendering/MathJaxRenderer";

const krokiRenderers = [
    "plantuml",
    "bpmn",
    "bytefield",
    "packetdiag",
    "seqdiag",
    "rackdiag",
    "blockdiag",
    "actdiag",
    "nwdiag",
    "pikchr",
    "structurizr",
    "excalidraw",
    "svgbob",
    "vega",
    "vegalite",
    "ditaa",
    "mermaid",
    "erd",
    "nomnoml",
    "graphviz",
    "wavedrom"
].map(type => new KrokiRenderer(type));

export const renderers: readonly Renderer[] = [
    ...krokiRenderers,
    new MathJaxRenderer("tex"),
    new MathJaxRenderer("asciimath")
].map(r => r.cached());

export default renderers;