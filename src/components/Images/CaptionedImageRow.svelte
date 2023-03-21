<script>
    export let srcs
    export let captions
    export let alts
    // export let height
</script>

<div class="grid grid-flow-row grid-cols-{srcs.length} gap-2 py-2 my-4">
    {#each srcs as src, i}
        <div class="">
            <img class="object-cover object-center w-96 h-48 mx-auto"
            src={"/images/"+src} alt={alts[i]}>
            <p class="text-primary-800 mt-2 text-sm">{captions[i]}</p>
        </div>
    {/each}
</div>
