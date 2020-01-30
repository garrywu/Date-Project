<template>
    <div>

                    <el-card >
						<el-row>
							<el-col :span="6">
								<p>&nbsp;</p>
							</el-col>
						    <el-col :span="11">
						<transition name="el-fade-in-linear">
                        <div class="transition-box">
                            <h1>Hello Garry!</h1>
							<p>&nbsp;</p>
						    <h2>{{msg}}</h2>
						</div>
						</transition>
						     </el-col>
						</el-row>
						<el-row>
							<el-col :span="6">
								<p>&nbsp;</p>
							</el-col>
						    <el-col :span="11">
						<div class="search-talent">
							<el-form ref="form" :model="form" label-width="80px">
								<el-form-item >
									<el-input v-model="form.talentname"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="onSubmit">Search</el-button>
								</el-form-item>
							</el-form>
						</div>
						     </el-col>
						</el-row>
						
						
                </el-card>
			

    </div>
</template>

<script>
	import Schart from 'vue-schart';
	import bus from '../common/bus';
    export default {
        name: 'dashboard',
        data() {
            return {
                name: localStorage.getItem('ms_username'),
                msg: 'Any talent you need?',
				form: {
					talentname: '',
					}
            }
        },
        computed: {
            role() {
                //return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        created(){
            this.handleListener();
            this.changeDate();
        },
        activated(){
            this.handleListener();
        },
        deactivated(){
            window.removeEventListener('resize', this.renderChart);
            bus.$off('collapse', this.handleBus);
        }
    }

</script>


<style scoped>
  .transition-box {
    margin-bottom: 10px;
    //width: 200px;
    //height: 100px;
    border-radius: 4px;
    //background-color: #409EFF;
    text-align: center;
    color: #757171;
    padding: 40px;
    box-sizing: border-box;
	
  }
  .search-talent{
	  width: 500px;
	  //margin: 0 auto;
	  text-align: center;
	  margin-bottom: 100px;
	  
  }

</style>
