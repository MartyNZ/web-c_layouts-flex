<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const qryTeam = groq`
  *[_type == "team"][0]{
    title,
    headline,
    members[]->{
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
  }
`;
const { data: team } = useSanityQuery(qryTeam);
</script>

<template>
  <section id="team" class="team">
    <div class="container" data-aos="fade-up">
      <header class="section-header">
        <h2>{{ team.title }}</h2>
        <p>{{ team.headline }}</p>
      </header>

      <div class="row gy-4">
        <div
          class="col-lg-3 col-md-6 d-flex align-items-stretch"
          data-aos="fade-up"
          data-aos-delay="100"
          v-for="member in team.members"
          :key="member._id"
        >
          <div class="member">
            <div class="member-img">
              <SanityImage
                :asset-id="member.imageId"
                class="img-fluid"
                :alt="member.fullName"
              />
              <div class="social">
                <template
                  v-for="connection in member.socialConnections"
                  :key="connection._key"
                >
                  <NuxtLink
                    :class="
                      connection._type === 'twitter'
                        ? 'x-twitter'
                        : connection._type
                    "
                    ><ClientOnly
                      ><FontAwesomeIcon
                        :icon="['fab', connection.iconName]"
                      ></FontAwesomeIcon></ClientOnly
                  ></NuxtLink>
                </template>
              </div>
            </div>
            <div class="member-info">
              <h4>{{ member.fullName }}</h4>
              <span>{{ member.role }}</span>
              <SanityContent :blocks="member.bio" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
