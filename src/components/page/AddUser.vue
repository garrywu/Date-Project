<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 用户管理</el-breadcrumb-item>
				<el-breadcrumb-item>新增用户</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="form-box">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="用户名称">
						<el-input v-model="form.username"></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-select v-model="form.usersex" placeholder="请选择">
							<el-option key="male" label="男" value="male"></el-option>
							<el-option key="female" label="女" value="female"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="出生日期">
						<el-col :span="11">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
						</el-col>
					</el-form-item>
					<el-form-item label="出生地">
						<el-input v-model="form.birthlocation"></el-input>
					</el-form-item>
					<el-form-item label="居住地">
						<el-input v-model="form.address"></el-input>
					</el-form-item>
					<el-form-item label="联系方式">
						<el-input v-model="form.mobile"></el-input>
					</el-form-item>
					<el-form-item label="职位">
						<el-input v-model="form.jobtitle"></el-input>
					</el-form-item>
					<el-form-item label="公司名称">
						<el-input v-model="form.company"></el-input>
					</el-form-item>
					<el-form-item label="年薪">
						<el-input v-model="form.salary"></el-input>
					</el-form-item>
					<el-form-item label="房产数量">
						<el-select v-model="form.housenumber" placeholder="请选择">
							<el-option key="1" label="1" value="1"></el-option>
							<el-option key="2" label="2" value="2"></el-option>
							<el-option key="3" label="3" value="3"></el-option>
							<el-option key="4" label="4" value="4"></el-option>
							<el-option key="5" label="5" value="5"></el-option>
							<el-option key="5+" label="多于5套" value="5+"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="个人爱好">
						<el-input v-model="form.hobby"></el-input>
					</el-form-item>
					<el-form-item label="是否离异">
						<el-switch v-model="form.divorce"></el-switch>
					</el-form-item>
					<el-form-item label="个性描述">
						<el-input type="textarea" rows="5" v-model="form.charactor"></el-input>
					</el-form-item>
					<el-form-item label="相亲要求">
						<el-input type="textarea" rows="5" v-model="form.requirement"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">添加用户</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'newuser',
		data: function() {
			return {
				form: {
					username: '',
					usersex: '',
					sexoption: [{
						value: 'male',
						label: '男'
					}, {
						value: 'female',
						label: '女'
					}],
					birthday: '',
					mobile:'',
					birthlocation: '',
					address: '',
					jobtitle: '',
					company: '',
					salary: '',
					housenumber: '',
					hobby: '',
					divorce: '',
					charactor: '',
					requirement: ''
				}
			}
		},
		methods: {
			onSubmit() {
				this.$message.success('提交成功！');
			}
		}
	}
</script>
