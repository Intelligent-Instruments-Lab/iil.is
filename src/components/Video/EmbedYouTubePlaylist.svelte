<script>
  export let id
  export let scale
  export let caption
</script>

<style>
  .videoWrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    padding-top: 25px;
    height: 0;
  }
  .videoWrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>

<div class="container mt-6 mb-6">
    <div class="videoWrapper">
    <iframe
        width={scale ? scale * 560 : 560}
        height={scale ? scale * 315 : 315}
        src={"https://www.youtube.com/embed/videoseries?list="+id}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen/>
    </div>
    <p class="text-primary-800 mt-2 text-sm">{caption}</p>
</div>