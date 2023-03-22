<script>
  import Photo from './Photo.svelte'
  import Thumb from './Thumbnail.svelte'
  import Links from './Links.svelte'

  export let person

  const nameToAnchor = (name) => {
    return name.toLowerCase().replace(/ /g, '-')
  }

</script>

<div class="flex">
  <div class="flex lg:space-x-10">
    <Photo src={person.image} name={person.name}/>
    <div>
      <div class="flex flex-wrap">
        <Thumb src={person.image} name={person.name}/>
        <div class="flex flex-col sm:ml-4 lg:ml-0">
          <h1 class="font-hauser text-secondary text-3xl mt-4">
            <a href={'#'+nameToAnchor(person.name)}>{person.name}</a>
            <span class="font-sans text-secondary-500 text-lg ml-1">
              ({person.pronouns})
            </span>
          </h1>
          <h3 class="text-primary-900 text-1xl px-2 mt-2">{person.role}</h3>
          <p class="text-primary-700 text-sm px-2 mt-1">
            <a href={"mailto:"+person.email} title={"Email "+person.name}>{person.email}</a>
          </p>
        </div>
      </div>
      <div class="px-2 mb-16 ">
        <p class="
          mt-2 sm:mt-4 mb-6 
          md:max-w-xl lg:max-w-1xl
          ">{person.bio}</p>
        <Links links={person.links}/>
      </div>
    </div>
  </div>
</div>
