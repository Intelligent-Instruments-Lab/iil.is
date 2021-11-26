<script>
  export let id
  export let scale
</script>

<div class="">
  <iframe
    width={scale ? scale * 560 : 560}
    height={scale ? scale * 315 : 315}
    src={"https://www.youtube.com/embed/videoseries?list="+id}
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen/>
</div>
