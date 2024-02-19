<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const query = groq`
*[_type=='settings'][0]{
  title,
  _id,
  description,
  siteOwner,
  'logoUrl':logo.asset->url,
  primaryLocation->{
    email,
    address,
    address2,
    city,
    state,
    postcode,
    country,
    socialConnections[]{
      _type,
      url,
      username,
      title
    },
    phoneNumbers[isPrimary]{
      label,
      number
    }
  }
}`;
const { data: settings } = useSanityQuery(query);
</script>
<template>
  <footer id="footer" class="footer">
    <AppNewsletterSignUp />

    <div class="footer-top">
      <div class="container">
        <div class="row gy-4">
          <div class="col-lg-5 col-md-12 footer-info">
            <NuxtLink to="/" class="logo d-flex align-items-center">
              <img :src="settings.logoUrl" alt="" />
              <span>{{ settings.title }}</span>
            </NuxtLink>
            <p>
              {{ settings.description }}
            </p>
            <div class="social-links mt-3">
              <template
                v-for="connection in settings.primaryLocation.socialConnections"
              >
                <NuxtLink
                  :to="`${connection.url}${connection.username}`"
                  target="_blank"
                  :class="
                    connection._type === 'x-twitter'
                      ? 'twitter'
                      : connection._type
                  "
                >
                  <ClientOnly>
                    <FontAwesomeIcon
                      :icon="['fab', connection._type]"
                    ></FontAwesomeIcon> </ClientOnly
                ></NuxtLink>
              </template>
            </div>
          </div>

          <!-- <AppFooterUsefulLinks :navigation="usefulLinks" />

          <AppFooterServiceList :services="services" /> -->

          <div
            class="col-lg-3 col-md-12 footer-contact text-center text-md-start"
          >
            <h4>Contact Us</h4>

            <p>
              {{ settings.primaryLocation.address }}<br />
              {{ settings.primaryLocation.city }},
              {{ settings.primaryLocation.state }}
              {{ settings.primaryLocation.postcode }}<br />
              {{ settings.primaryLocation.country }}<br /><br />
              <strong>Phone:</strong>
              {{ settings.primaryLocation.phoneNumbers[0].label }}<br />
              <strong>Email:</strong> {{ settings.primaryLocation.email }}<br />
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="copyright">
        &copy; Copyright
        <strong
          ><span>{{ settings.siteOwner }}</span></strong
        >. All Rights Reserved
      </div>
    </div>
  </footer>
</template>
