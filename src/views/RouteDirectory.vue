<template>
  <div class="directory-page">
    <div class="directory-shell">
      <header class="directory-header">
        <p class="eyebrow">Route Directory</p>
        <h1>Connected Vue Screens</h1>
        <p class="directory-copy">All discovered Vue pages from the six source folders are now reachable from the main app router.</p>
      </header>

      <section class="summary-grid">
        <article class="summary-card">
          <span class="summary-value">{{ totalPages }}</span>
          <span class="summary-label">Connected pages</span>
        </article>
        <article class="summary-card">
          <span class="summary-value">{{ externalRouteGroups.length }}</span>
          <span class="summary-label">Source folders</span>
        </article>
      </section>

      <section v-for="group in externalRouteGroups" :key="group.source" class="group-card">
        <div class="group-head">
          <div>
            <p class="group-kicker">{{ group.slug }}</p>
            <h2>{{ group.source }}</h2>
          </div>
          <span class="count-pill">{{ group.items.length }} files</span>
        </div>

        <div class="route-list">
          <RouterLink
            v-for="item in group.items"
            :key="item.path"
            :to="item.path"
            class="route-link"
          >
            <span class="route-title">{{ item.title }}</span>
            <span class="route-file">{{ item.file }}</span>
          </RouterLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { externalRouteGroups } from '../router/generated-routes'

const totalPages = computed(() => externalRouteGroups.reduce((sum, group) => sum + group.items.length, 0))
</script>

<style scoped>
.directory-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f3f7fb 0%, #e3edf7 100%);
  padding: 32px 18px 48px;
}

.directory-shell {
  max-width: 980px;
  margin: 0 auto;
}

.directory-header {
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #0d8a72;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.directory-header h1 {
  margin: 0 0 10px;
  color: #0a2540;
  font-size: clamp(30px, 5vw, 46px);
  line-height: 1;
}

.directory-copy {
  max-width: 720px;
  margin: 0;
  color: #526273;
  font-size: 15px;
  line-height: 1.6;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 22px;
}

.summary-card,
.group-card {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(10, 37, 64, 0.08);
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(10, 37, 64, 0.08);
  backdrop-filter: blur(14px);
}

.summary-card {
  padding: 20px;
}

.summary-value {
  display: block;
  color: #0a2540;
  font-size: 34px;
  font-weight: 900;
}

.summary-label {
  color: #617385;
  font-size: 13px;
  font-weight: 700;
}

.group-card {
  padding: 20px;
  margin-bottom: 16px;
}

.group-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 16px;
}

.group-kicker {
  margin: 0 0 4px;
  color: #7990a5;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.group-head h2 {
  margin: 0;
  color: #0a2540;
  font-size: 24px;
}

.count-pill {
  padding: 8px 12px;
  border-radius: 999px;
  background: #dff7f1;
  color: #0d8a72;
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
}

.route-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}

.route-link {
  display: block;
  padding: 14px 16px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid rgba(10, 37, 64, 0.08);
  color: inherit;
  text-decoration: none;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.route-link:hover {
  transform: translateY(-2px);
  border-color: rgba(13, 138, 114, 0.35);
  box-shadow: 0 14px 28px rgba(10, 37, 64, 0.08);
}

.route-title {
  display: block;
  margin-bottom: 6px;
  color: #0a2540;
  font-size: 15px;
  font-weight: 800;
}

.route-file {
  display: block;
  color: #617385;
  font-size: 12px;
  line-height: 1.5;
  word-break: break-word;
}

@media (max-width: 640px) {
  .directory-page {
    padding-inline: 12px;
  }

  .group-head {
    flex-direction: column;
  }
}
</style>
