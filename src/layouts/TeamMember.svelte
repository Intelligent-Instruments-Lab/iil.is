<script>
  export let member
  /*
  {
    "name": "Thor Magnusson",
    "title": "Professor of Future Music",
    "bio": "A worker in rhythm, frequencies and intensities. Research and development in the areas of music and technology. I am a professor of future music in the Music Department at the University of Sussex and a research professor at the Iceland University of the Arts. In 2021 I serve as an Edgard-Varèse guest professor at the Technische Universität Berlin.",
    "email": "thor.magnusson@lhi.is",
    "image": "thor.jpg",
    "links": {
      "twitter": "thormagnusson",
      "github": "thormagnusson"
    }
  }
  */

</script>

<h1>Name: {member.name}</h1>
<h2>Title: {member.title}</h2>
<p>Bio: {member.bio}</p>
<p><b>Email: <a href={"mailto:"+member.email} title={"Email "+member.name}>{member.email}</a></b></p>
<br>
<br>

