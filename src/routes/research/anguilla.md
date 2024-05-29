---
layout: researchproject
title: "Anguilla"
slug: "anguilla"
description: "Interactive machine learning in Python"
featured: true
authors: ["Victor Shepardson", "Jack Armitage", "Nicola Privato"]
highlight_image: "research/projects/anguilla.jpg"
highlight_caption: "Anguilla mapping visualised using Tölvera."
---

<script>
  import CaptionedImage from "../../components/Images/CaptionedImage.svelte"
</script>

Anguilla is a mapping and interactive machine learning package for digital musical instrument design in Python, designed around the idea of building mappings from one space to another by interactive supervised learning. 
It can be installed via `pip install anguilla-iml`. 
Anguilla is being used in many of our projects, including [Magnetic Scores](/research/magnetic-scores), [Stacco](/research/stacco), [Thales](/research/thales), [Organium](/research/organium) and [Tölvera](/research/tolvera).
Learn more and start using the `anguilla` package via the [Anguilla website](https://intelligent-instruments-lab.github.io/anguilla/)
For examples and tutorials, see the [iil-examples](https://github.com/Intelligent-Instruments-Lab/iil-examples/tree/main/anguilla) repo.

In the very small-data regime of IML, rigorous application of machine learning algorithms is often impractical, and at worst counter to artistic intent. 
To emphasise interactivity, Anguilla builds on nearest-neighbor search algorithms which don't require a distinct training phase, with mappings defined deterministically by their training data. 
By removing most complexity associated with the choice of learning algorithm, we hope to foreground the training data and the interface for creating it. 
Anguilla does not provide a user interface itself, but rather a simple API on which applications can be built, with essentially the ability to `IML.add(x, y)` the input-output pair `x, y` to a mapping and `y = IML.map(x)` a new input to an output value. 

<!-- Anguilla breaks down into three kinds of module: embedding, search, and interpolation.  -->
<!-- Given a dataset of input-output pairs `(x, y)`, input and output embedding modules maps data to feature vectors `v = f(x)` and `w = g(y)`.  -->
<!-- A nearest-neighbor search module maps an input vector `v_q = f(x_q)` to a set of relevant inputs `v` from the dataset, where each `v_i` has distance `d_i` from `v_q`, and an associated point `w_i` in the output feature space. -->
<!-- An interpolation module converts the set of distances to a set of weights `alpha` for linearly interpolating  -->
<!-- $w_q = \sum_i \alpha_i w_i / \sum_i w_i$ -->
<!-- % $w_q = \frac{\sum_i \alpha_i w_i}{\sum_i w_i}$ -->
<!-- , and finally the inverse output embedding produces $y_q = g^{-1}(w_q)$. -->

<!-- Anguilla's default L2 metric and `Smooth` interpolation module, for example, compute -->
<!-- $$
\alpha_i = \frac{1}{d_i} - \frac{d_i^2 - 3d_iD + 3D^2}{D^3}
$$ -->

<!-- where $d_i = ||v_i - q||_2 + \epsilon$ and $D = \max_i(d_i)$.
The $1/d_i$ term ensures that the output interpolates the data, while the rest is chosen to zero the value and first derivative of the weight when $d_i = d_k$, i.e. at the edges of voronoi cells. -->

<!-- A search module is powered by an `Index` object, of which Anguilla currently provides two: `IndexBrute` is a simple pure-Python reference implementation, while `IndexFast` uses the Faiss package internally to enable high-throughput operation when, for example, mapping every pixel in an image through Anguilla at once. -->

<!-- Embedding modules `f` and `g` can be written to map many kinds of input and output data onto the simple vectors used by the search and interpolate modules -- these can be as simple as the identity function, or as complicated as a deep generative model.  -->
<!-- With [Tölvera](/research/tolvera), for example, an `ProjectAndSort` input embedding enables the use of unordered sets of [Tölvera](/research/tolvera) particles as inputs, approximating the sliced optimal transport distance between point clouds. -->

The Anguilla API is available from Python, and can also be exposed over open sound control (OSC) for use from music programming environments like Max/MSP, Pure Data, and SuperCollider, via the [`iipyper`](/research/iipyper) package.
