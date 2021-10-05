<script>
  import Photo from './Photo.svelte'
  import Thumb from './Thumbnail.svelte'
  import Links from './Links.svelte'

  export let member

</script>

<div class="flex">
  <div class="flex lg:space-x-10">
    <Photo src={member.image} name={member.name}/>
    <div>
      <div class="flex flex-wrap">
        <Thumb src={member.image} name={member.name}/>
        <div class="flex flex-col sm:ml-4 lg:ml-0">
          <h1 class="font-hauser text-secondary text-3xl mt-4">
            {member.name}
            <span class="font-sans text-secondary-500 text-lg ml-1">
              ({member.pronouns})
            </span>
          </h1>
          <h3 class="text-primary-900 text-1xl px-2 mt-2">{member.role}</h3>
          <p class="text-primary-700 text-sm px-2 mt-1">
            <a href={"mailto:"+member.email} title={"Email "+member.name}>{member.email}</a>
          </p>
        </div>
      </div>
      <div class="px-2 mb-16 ">
        <p class="
          mt-2 sm:mt-4 mb-6 
          md:max-w-xl lg:max-w-1xl
          ">{member.bio}</p>
        <Links links={member.links}/>
      </div>
    </div>
  </div>
</div>
