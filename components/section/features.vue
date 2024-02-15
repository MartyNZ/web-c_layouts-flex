<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const qryFeatures = groq`
  *[_type=='features'][0]{
    title,
    headline,
    'slug':slug.current,
    simpleList{
      isActive,
      'imgId':image.asset->_id,
      simpleList
    },
    tabbedList{
      isActive,
    'imgId':image.asset->_id,
      tabbedListTitle,
      tabbedList[]{
        _key,
        tabTitle,
        body,
      }
    },
    iconList{
      isActive,
      listTitle,
      'imgId':listImage.asset->_id,
      iconListItem[]{
        _key,
        itemTitle,
        body,
        icon{
          style,
          'name':provider +'-'+ name,
        }
      }
    },
  }`;
const { data: features } = useSanityQuery(qryFeatures);
</script>
<template>
  <section id="features" class="features">
    <div class="container" data-aos="fade-up">
      <header class="section-header">
        <h2>{{ features.title }}</h2>
        <p>{{ features.headline }}</p>
      </header>
      <div class="row" v-if="features.simpleList.isActive">
        <div class="col-lg-6">
          <SanityImage
            :asset-id="features.simpleList.imgId"
            auto="format"
            class="img-fluid"
            :alt="features.title"
          />
        </div>

        <div class="col-lg-6 mt-5 mt-lg-0 d-flex">
          <div class="row align-self-center gy-4">
            <div
              class="col-md-6"
              data-aos="zoom-out"
              data-aos-delay="200"
              v-for="(item, index) in features.simpleList.simpleList"
              :key="index"
            >
              <div class="feature-box d-flex align-items-center gap-2">
                <ClientOnly>
                  <FontAwesomeIcon
                    icon="fad fa-check-double"
                    style="height: 2em; color: #4154f1"
                  ></FontAwesomeIcon>
                </ClientOnly>
                <h3>{{ item }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- / row -->

      <!-- Feature Tabs -->
      <div
        class="row feature-tabs"
        data-aos="fade-up"
        v-if="features.tabbedList.isActive"
      >
        <div class="col-lg-6">
          <h3>
            {{ features.tabbedList.tabbedListTitle }}
          </h3>

          <!-- Tabs -->
          <ul class="nav nav-pills mb-3">
            <li
              v-for="(item, index) in features.tabbedList.tabbedList"
              :key="item._key"
            >
              <a
                :class="index === 0 ? 'active' : ''"
                class="nav-link"
                data-bs-toggle="pill"
                :href="`#${item._key}`"
                >{{ item.tabTitle }}</a
              >
            </li>
          </ul>
          <!-- End Tabs -->

          <!-- Tab Content -->
          <div class="tab-content">
            <div
              :class="index === 0 ? 'active' : ''"
              class="tab-pane fade show"
              :id="item._key"
              v-for="(item, index) in features.tabbedList.tabbedList"
              :key="item._key"
            >
              <SanityContent :blocks="item.body" />
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <SanityImage
            :asset-id="features.tabbedList.imgId"
            auto="format"
            class="img-fluid"
            :alt="features.tabbedList.tabbedListTitle"
          />
        </div>
      </div>
      <!-- End Feature Tabs -->

      <!-- Feature Icons -->
      <div
        class="row feature-icons"
        data-aos="fade-up"
        v-if="features.iconList.isActive"
      >
        <h3>{{ features.iconList.listTitle }}</h3>

        <div class="row">
          <div
            class="col-xl-4 text-center"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <SanityImage
              :asset-id="features.iconList.imgId"
              auto="format"
              class="img-fluid p-4"
              :alt="features.iconList.listTitle"
            />
          </div>

          <div class="col-xl-8 d-flex content">
            <div class="row align-self-center gy-4">
              <div
                class="col-md-6 d-flex align-self-center gap-2"
                v-for="item in features.iconList.iconListItem"
                data-aos="fade-up"
              >
                <ClientOnly>
                  <FontAwesomeIcon
                    :icon="`${item.icon.style} ${item.icon.name}`"
                    style="height: 3em; color: #4154f1"
                  ></FontAwesomeIcon>
                </ClientOnly>
                <div>
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.body }}</p>
                </div>
              </div>

              <!-- <div
                class="col-md-6 icon-box"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <i class="ri-stack-line"></i>
                <div>
                  <h4>Ullamco laboris nisi</h4>
                  <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt
                  </p>
                </div>
              </div>

              <div
                class="col-md-6 icon-box"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <i class="ri-brush-4-line"></i>
                <div>
                  <h4>Labore consequatur</h4>
                  <p>
                    Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut
                    maiores omnis facere
                  </p>
                </div>
              </div>

              <div
                class="col-md-6 icon-box"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <i class="ri-magic-line"></i>
                <div>
                  <h4>Beatae veritatis</h4>
                  <p>
                    Expedita veritatis consequuntur nihil tempore laudantium
                    vitae denat pacta
                  </p>
                </div>
              </div>

              <div
                class="col-md-6 icon-box"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <i class="ri-command-line"></i>
                <div>
                  <h4>Molestiae dolor</h4>
                  <p>
                    Et fuga et deserunt et enim. Dolorem architecto ratione
                    tensa raptor marte
                  </p>
                </div>
              </div>

              <div
                class="col-md-6 icon-box"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <i class="ri-radar-line"></i>
                <div>
                  <h4>Explicabo consectetur</h4>
                  <p>
                    Est autem dicta beatae suscipit. Sint veritatis et sit quasi
                    ab aut inventore
                  </p>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <!-- End Feature Icons -->
    </div>
  </section>
</template>
