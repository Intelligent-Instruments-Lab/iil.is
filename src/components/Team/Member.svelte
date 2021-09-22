<script>
  import Photo from './Photo.svelte'
  import Links from './Links.svelte'

  export let member

</script>

<div class="flex">
  <div class="space-x-6 flex">
    <Photo src={member.image} name={member.name}/>
    <div>
      <h1>Name: {member.name}</h1>
      <h3>Role: {member.role}</h3>
      <p>Bio: {member.bio}</p>
      <p><b>Email: <a href={"mailto:"+member.email} title={"Email "+member.name}>{member.email}</a></b></p>
      <Links links={member.links}/>
    </div>
  </div>
</div>
