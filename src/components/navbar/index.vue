<template>
<b-row>
  <b-col cols="12">
  	<nav class="navbar bg-nav-bar">
		<div class="container">
			<a class="navbar-brand" href="#">
        <font-awesome-icon icon="users"/> Cadastro de usuários
			</a>
		</div>
	</nav>
  </b-col>
</b-row>
</template>

<script>
export default {
  name: 'custom-navbar',
  props:{
    btn:{
      type: String
    }
  },
  methods:{
    clicked(){
      this.$emit('clicked');
    }
  }
  
}
</script>

<style lang="scss" scoped>
.bg-nav-bar{
  text-align: center;
  background: #00897b;
  a{
    color: #fff !important;
  }
}
</style>