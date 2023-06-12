
<template>
  <div class="App">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Menú Académico</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to='/grupoUsuario'> GrupoUsuario </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to='/profesor'> Profesor </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to='/seccion'> Sección </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to='/horario'> Horario </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to='/participacion'> Participación </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>
    <router-view></router-view> <!-- Esto se remplaza segun el componente seleccionado en el router-->
    <!-- fin Router -->
  </div>
</template>


<script>
import GrupoUsuarioComponent from './components/GrupoUsuarioComponent.vue';
import ProfesorComponent from './components/ProfesorComponent.vue';
import SeccionComponent from './components/SeccionComponent.vue';
import HorarioComponent from './components/HorarioComponent.vue';
import ParticipacionComponent from './components/ParticipacionComponent.vue';

export default {
  name: 'App',
  components: {
    GrupoUsuarioComponent,
    ProfesorComponent,
    SeccionComponent,
    HorarioComponent,
    ParticipacionComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.App {
  padding: 5px;
}

</style>
