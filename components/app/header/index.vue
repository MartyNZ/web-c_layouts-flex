<template>
  <header id="header" class="header fixed-top">
    <div
      class="container-fluid container-xl d-flex align-items-center justify-content-between"
    >
      <a href="/" class="logo d-flex align-items-center">
        <img src="assets/img/logo.png" alt="" />
        <span>FlexStart</span>
      </a>

      <nav id="navbar" class="navbar">
        <AppHeaderMenu />
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
    </div>
  </header>
</template>
