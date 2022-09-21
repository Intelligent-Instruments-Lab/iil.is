<script>
    import icons from '../../assets/svg/icons/Icons.js'
    let discordInviteURL = icons.filter(c => c.label == "Discord")[0].url
</script>

<div class="mt-6 mb-4 grid grid-flow-row grid-cols-4 sm:grid-cols-8 gap-2">
    {#each icons as i}
        <a href={i.url} target="_blank">
            <img class="h-8 mx-auto" alt={i.label} src={i.icon}>
            <p class="text-sm text-secondary text-center">{i.label}</p>
        </a>
    {/each}
</div>
