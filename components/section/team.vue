<script setup>
const qryTeam = groq`
  *[_type == "contact" && contactType match 'Team Member'][]{
    contactType,
    _id,
    firstName,
    lastName,
    'fullName': firstName + ' ' + lastName,
    'slug':slug.current,
    image,
    'imageId':image.asset->_id,
    bio,
    role,
    socialConnections
  }
`;
const { data: team } = useSanityQuery(qryTeam);
</script>

<template>
  <section id="team" class="team">
    <pre>{{ team }}</pre>
    <!-- <div class="container" data-aos="fade-up">
      <header class="section-header">
        <h2>{{ team.title }}</h2>
        <p>{{ team.headline }}</p>
      </header>

      <div class="row gy-4">
        <div
          class="col-lg-3 col-md-6 d-flex align-items-stretch"
          data-aos="fade-up"
          data-aos-delay="100"
          v-for="item in team"
        >
          <div class="member">
            <div class="member-img">
              <SanityImage
                :asset-id="item.imageId"
                class="img-fluid"
                :alt="item.fullName"
              />
              <div class="social">
                <a href=""><i class="bi bi-twitter"></i></a>
                <a href=""><i class="bi bi-facebook"></i></a>
                <a href=""><i class="bi bi-instagram"></i></a>
                <a href=""><i class="bi bi-linkedin"></i></a>
              </div>
            </div>
            <div class="member-info">
              <h4>Walter White</h4>
              <span>Chief Executive Officer</span>
              <p>
                Velit aut quia fugit et et. Dolorum ea voluptate vel tempore
                tenetur ipsa quae aut. Ipsum exercitationem iure minima enim
                corporis et voluptate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </section>
</template>
