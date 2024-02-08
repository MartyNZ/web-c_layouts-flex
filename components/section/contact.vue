<script setup>
const query = groq`
*[_type=='settings'][0]{
  title,
  _id,
  description,
  siteOwner,
  primaryLocation->{
    email,
    address,
    address2,
    city,
    state,
    postcode,
    country,
    openHours,
    socialConnections[]{
      _type,
      url,
      username,
      title
    },
    phoneNumbers[]{
      label,
      number
    }
  }
}`;
const { data: settings } = useSanityQuery(query);
</script>
<template>
  <section id="contact" class="contact">
    <div class="container" data-aos="fade-up">
      <header class="section-header">
        <h2>Contact</h2>
        <p>Contact Us</p>
      </header>

      <div class="row gy-4">
        <div class="col-lg-6">
          <div class="row gy-4">
            <div class="col-md-6">
              <div class="info-box">
                <i class="bi bi-geo-alt"></i>
                <h3>Address</h3>
                <p>
                  {{ settings.primaryLocation.address }},<br />{{
                    settings.primaryLocation.city
                  }}, {{ settings.primaryLocation.state }}
                  {{ settings.primaryLocation.postcode }}
                </p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="info-box">
                <i class="bi bi-telephone"></i>
                <h3>Call Us</h3>
                <p>
                  <template
                    v-for="number in settings.primaryLocation.phoneNumbers"
                    >{{ number.label }}<br
                  /></template>
                </p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="info-box">
                <i class="bi bi-envelope"></i>
                <h3>Email Us</h3>
                <p>{{ settings.primaryLocation.email }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="info-box">
                <i class="bi bi-clock"></i>
                <h3>Open Hours</h3>
                <SanityContent :blocks="settings.primaryLocation.openHours" />
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <FormContact />
        </div>
      </div>
    </div>
  </section>
</template>
