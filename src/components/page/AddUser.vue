<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 用户管理</el-breadcrumb-item>
				<el-breadcrumb-item>新增用户</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<el-row>
				<el-col :span="5">
					&nbsp;
				</el-col>
				<el-col :span="14">
					<el-steps :active="active">
						<el-step title="步骤 1" description="填写新增用户信息"></el-step>
						<el-step title="步骤 2" description="填写相亲对象要求"></el-step>
					</el-steps>
				</el-col>
			</el-row>
			<p>&nbsp;</p>
			<div class="form-box">
				<el-form ref="form" :model="form" label-width="80px" v-if="active==0">
					<el-form-item label="用户名称">
						<el-input v-model="form.customerName"></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-select v-model="form.gender" placeholder="请选择">
							<el-option key="male" label="男" value="male"></el-option>
							<el-option key="female" label="女" value="female"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="出生日期">
						<el-col :span="11">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
						</el-col>
					</el-form-item>
					<el-form-item label="年龄">
						<el-input v-model="form.age"></el-input>
					</el-form-item>
					<el-form-item label="出生地">
						<el-cascader :options="form.birthoptions" v-model="form.birthPlace" @change="handlebirthChange">
						</el-cascader>
					</el-form-item>
					<el-form-item label="居住地">
						<el-cascader :options="form.addressoptions" v-model="form.address" @change="handleaddressChange">
						</el-cascader>
					</el-form-item>
					<el-form-item label="联系方式">
						<el-input v-model="form.phoneNumber"></el-input>
					</el-form-item>
					<el-form-item label="最高学历">
						<el-select v-model="form.education" placeholder="请选择">
							<el-option key="1" label="博士及以上" value="1"></el-option>
							<el-option key="2" label="硕士" value="2"></el-option>
							<el-option key="3" label="本科" value="3"></el-option>
							<el-option key="4" label="专科" value="4"></el-option>
							<el-option key="5" label="高中及以下" value="5"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="职位">
						<el-input v-model="form.profession"></el-input>
					</el-form-item>
					<el-form-item label="公司名称">
						<el-input v-model="form.company"></el-input>
					</el-form-item>
					<el-form-item label="年薪">
						<el-input v-model="form.salary"></el-input>
					</el-form-item>
					<el-form-item label="房产数量">
						<el-select v-model="form.houseNumber" placeholder="请选择">
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
<<<<<<< HEAD
						<el-input v-model="form.isDivorce"></el-input>
					</el-form-item>
					<el-form-item label="是否有车">
						<el-input v-model="form.haveCar"></el-input>
=======
						<el-select v-model="form.isDivorce" placeholder="请选择">
							<el-option key="0" label="是" value="0"></el-option>
							<el-option key="1" label="否" value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="是否有车">
						<el-select v-model="form.haveCar" placeholder="请选择">
							<el-option key="0" label="是" value="0"></el-option>
							<el-option key="1" label="否" value="1"></el-option>
						</el-select>
>>>>>>> 31c0213ba29875cb9364a91c9c2e66dbe4c36354
					</el-form-item>
					<el-form-item label="子女数量">
						<el-input-number v-model="form.childNumber" controls-position="right" :min="0" :max="10"></el-input-number>
					</el-form-item>
					<el-form-item label="个性描述">
						<div style="text-align: center">
							<el-transfer style="text-align: left; display: inline-block" filterable :titles="['可选项', '选中项']" v-model="form.personality"
							 :data="form.data2" :button-texts="['撤销标签', '选中标签']" :format="{noChecked: '${total}',hasChecked: '${checked}/${total}'}"
							 @change="handleChange">
								<span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
								<!-- <el-button class="transfer-footer"  slot="right-footer" size="small">清空选中项</el-button> -->
							</el-transfer>
						</div>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onNext">下一步</el-button>
						<el-button @click="onClear">清空输入</el-button>
					</el-form-item>
				</el-form>
				<el-form ref="form" :model="form" label-width="80px" v-if="active==2">
					<el-form-item label="相亲要求">
						<el-row>
							<el-col :span="18">
								<el-row>
									<el-col :span="12">
										<el-form-item label="接受离异">
											<el-checkbox v-model="form.divorceReq"></el-checkbox>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-rate v-model="form.divorceWeg" class="userrate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :show-text="true"
										 :texts="['不重要', '不太重要', '一般', '比较重要', '非常重要']">
										</el-rate>
									</el-col>
								</el-row>
							</el-col>
							<el-col :span="18">
								<el-row>
									<el-col :span="12">
										<el-form-item label="接受有子">
											<el-checkbox v-model="form.childReq"></el-checkbox>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-rate v-model="form.childWeg" class="userrate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :show-text="true"
										 :texts="['不重要', '不太重要', '一般', '比较重要', '非常重要']">
										</el-rate>
									</el-col>
								</el-row>
							</el-col>

							<el-col :span="18">
								<el-row>
									<el-col :span="12">
										<el-form-item label="接受外地">
											<el-checkbox v-model="form.localReq"></el-checkbox>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-rate v-model="form.localWeg" class="userrate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :show-text="true"
										 :texts="['不重要', '不太重要', '一般', '比较重要', '非常重要']">
										</el-rate>
									</el-col>
								</el-row>
							</el-col>
							<el-col :span="18">
								<el-row>
									<el-col :span="12">
										<el-form-item label="是否有车">
											<el-checkbox v-model="form.carReq"></el-checkbox>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-rate v-model="form.carWeg" class="userrate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :show-text="true"
										 :texts="['不重要', '不太重要', '一般', '比较重要', '非常重要']">
										</el-rate>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="18">
								<el-row>
									<el-col :span="8">
										<el-form-item label="房产数量">
											<el-input v-model="form.houseReq"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="4">
										<p>&nbsp;</p>
									</el-col>
									<el-col :span="12">
										<el-rate v-model="form.houseWeg" class="userrate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :show-text="true"
										 :texts="['不重要', '不太重要', '一般', '比较重要', '非常重要']">
										</el-rate>
									</el-col>
								</el-row>
							</el-col>

							<el-col :span="18">
								<el-row>
									<el-col :span="10">
										<el-form-item label="年薪要求">
											<el-input v-model="form.salaryReq"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="2">
										<p>万</p>
									</el-col>
									<el-col :span="12">
										<el-rate v-model="form.salaryWeg" class="userrate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :show-text="true"
										 :texts="['不重要', '不太重要', '一般', '比较重要', '非常重要']">
										</el-rate>
									</el-col>
								</el-row>
							</el-col>

							<el-col :span="18">
								<el-row>
									<el-col :span="10">
										<el-form-item label="学历要求">
											<el-input v-model="form.educationReq"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="2">
										<p>&nbsp;</p>
									</el-col>
									<el-col :span="12">
										<el-rate v-model="form.educationWeg" class="userrate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :show-text="true"
										 :texts="['不重要', '不太重要', '一般', '比较重要', '非常重要']">
										</el-rate>
									</el-col>
								</el-row>
							</el-col>

<el-col :span="18">
        <el-row>
         <el-col :span="10">
          <el-form-item label="职业要求">
           <el-input v-model="form.professionReq"></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="2">
          <p>&nbsp;</p >
         </el-col>
         <el-col :span="12">
          <el-rate v-model="form.professionWeg" class="userrate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :show-text="true"
           :texts="['不重要', '不太重要', '一般', '比较重要', '非常重要']">
          </el-rate>
         </el-col>
        </el-row>
       </el-col>

							<el-col :span="12">
								<el-form-item label="年龄要求">
									<el-date-picker v-model="form.tbirth" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
									 :default-time="['00:00:00', '23:59:59']">
									</el-date-picker>
									<el-rate v-model="form.ageWeg" class="userrate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :show-text="true"
									 :texts="['不重要', '不太重要', '一般', '比较重要', '非常重要']">
									</el-rate>
								</el-form-item>
							</el-col>
						</el-row>
						<el-form-item label="特别需求">
							<el-input type="textarea" rows="5" v-model="form.requirement"></el-input>
							<el-rate v-model="form.requirement_p" class="userrate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :show-text="true"
							 :texts="['不重要', '不太重要', '一般', '比较重要', '非常重要']">
							</el-rate>
						</el-form-item>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">添加用户</el-button>
						<el-button @click="onPre">返回上一步</el-button>
						<el-button @click="onClear">清空输入</el-button>
					</el-form-item>
				</el-form>
			</div>

		</div>

	</div>
</template>

<script>
	import {
		regionData,
		CodeToText,
		TextToCode
	} from 'element-china-area-data';
	export default {
		name: 'newuser',
		data: function() {
			const generateData2 = _ => {
				const data = [];
				const characters = ['开朗', '腼腆', '幽默', '成熟', '事业心', '贤惠', '乖巧'];
				characters.forEach((character, index) => {
					data.push({
						label: character,
						key: index
					});
				});
				return data;
			};
			return {
				form: {
					customerName: '',
					gender: '',
					sexoption: [{
						value: 'male',
						label: '男'
					}, {
						value: 'female',
						label: '女'
					}],
					age: '',
					birthday: '',
					education: '',
<<<<<<< HEAD
					birthPlace: '',
					phoneNumber: '',
					address: '',
=======
>>>>>>> 31c0213ba29875cb9364a91c9c2e66dbe4c36354
					profession: '',
					company: '',
					salary: '',
					houseNumber: '',
					hobby: '',
					isDivorce: '',
					childNumber: 0,
					haveCar: '',
					divorceReq: '',
					carReq: '',
					localReq: '',
					childReq: '',
					houseReq: '2',
					salaryReq: '',
					educationReq: '',
					professionReq: '',
					professionWeg: '',
					minAgeReq: '',
					maxAgeReq: '',
					requirement: '',
					requireVisible: false,
					divorceWeg: null,
					childWeg: null,
					localWeg: null,
					carWeg: null,
					houseWeg: null,
					salaryWeg: null,
					educationWeg: null,
					ageWeg: null,
					requirement_p: null,
					data2: generateData2(),
					personality: [],
<<<<<<< HEAD
					professionReq:null,
     				professionWeg:null,
     				tbirht:null
=======
					birthoptions: regionData,
					birthPlace: ['310000','310100','310109'],
					addressoptions: regionData,
					address: ['310000','310100','310109']
>>>>>>> 31c0213ba29875cb9364a91c9c2e66dbe4c36354
				},
				requireVisible: false,
				active: 0,
				defaultForm: '',


			}
		},
		created() {
			this.defaultForm = JSON.parse(JSON.stringify(this.form));
		},
		methods: {
			onSubmit() {
				//this.$message.success('客户添加成功');
				this.active = 0;
var formData = new FormData();
				formData.append('age', this.form.age);
				formData.append('customerName', this.form.customerName);
				formData.append('gender', this.form.gender);
				formData.append('birthday', this.form.birthday);
				formData.append('education', this.form.education);
				formData.append('phoneNumber', this.form.phoneNumber);
				formData.append('birthPlace', this.form.birthPlace);
				formData.append('address', this.form.address);
				formData.append('profession', this.form.profession);
				formData.append('company', this.form.company);
				formData.append('salary', this.form.salary);
				formData.append('houseNumber', this.form.houseNumber);
				formData.append('hobby', this.form.hobby);
				formData.append('isDivorce', this.form.isDivorce);
				formData.append('childNumber', this.form.childNumber);
				formData.append('haveCar', this.form.haveCar);
				formData.append('divorceReq', this.form.divorceReq);
				formData.append('carReq', this.form.carReq);
				formData.append('localReq', this.form.localReq);
				formData.append('childReq', this.form.childReq);
				formData.append('houseReq', this.form.houseReq);
				formData.append('salaryReq', this.form.salaryReq);
				formData.append('educationReq', this.form.educationReq);
				formData.append('minAgeReq', this.form.tbirth[0]);
				formData.append('maxAgeReq', this.form.tbirth[1]);
				formData.append('requirement', this.form.requirement);
				formData.append('divorceWeg', this.form.divorceWeg);
				formData.append('childWeg', this.form.childWeg);
				formData.append('localWeg', this.form.localWeg);
				formData.append('carWeg', this.form.carWeg);
				formData.append('houseWeg', this.form.houseWeg);
				formData.append('salaryWeg', this.form.salaryWeg);
				formData.append('educationWeg', this.form.educationWeg);
				formData.append('ageWeg', this.form.ageWeg);
				formData.append('requirement_p', this.form.requirement_p);
				formData.append('personality', this.form.personality.toString());
				formData.append('professionReq', this.form.professionReq);
				formData.append('professionWeg', this.form.professionWeg);
				this.$axios.post("love/api/addCustomer", formData)
					.then((res) => {
						return res
					})
					.catch((err) => {
						return err
					});
//				this.$axios.post('love/api/addCustomer', {
//					    age:this.form.age,
//					    gender:this.form.gender,
//						birthday: this.form.birthday,
//						education: this.form.education,
//						phoneNumber:this.form.phoneNumber,
//						birthPlace: this.form.birthPlace,
//						address: this.form.address,
//						profession: this.form.profession,
//						company: this.form.company,
//						salary: this.form.salary,
//						houseNumber: this.form.houseNumber,
//						hobby: this.form.hobby,
//						isDivorce: this.form.isDivorce,
//						childNumber: this.form.childNumber,
//						haveCar: this.form.haveCar,
//						divorceReq: this.form.divorceReq,
//						carReq: this.form.carReq,
//						localReq: this.form.localReq,
//						childReq: this.form.childReq,
//						houseReq: this.form.houseReq,
//						salaryReq: this.form.salaryReq,
//						educationReq: this.form.educationReq,
//						minAgeReq: this.form.tbirth[0],
//						maxAgeReq: this.form.tbirth[1],
//						requirement: this.form.requirement,
//						divorceWeg: this.form.divorceWeg,
//						childWeg: this.form.childWeg,
//						localWeg: this.form.localWeg,
//						carWeg: this.form.carWeg,
//						houseWeg: this.form.houseWeg,
//						salaryWeg: this.form.salaryWeg,
//						educationWeg: this.form.educationWeg,
//						ageWeg: this.form.ageWeg,
//						requirement_p: this.form.requirement_p,
//						personality: this.form.personality.toString(),
//						professionReq:this.form.professionReq,
//						professionWeg:this.form.professionWeg
//					})
//					.then(function(response) {
//						console.log(response);
//					})
//					.catch(function(error) {
//						console.log(error);
//					});
			},
			onNext() {
				alert(this.form.personality);
				this.active = this.active + 2;
			},
			onPre() {
				this.active = this.active - 2;
			},
			onClear() {
				this.form = JSON.parse(JSON.stringify(this.defaultForm));
			},
			handlebirthChange(value) {
				console.log(value);
			},
			handleaddressChange(value) {
				console.log(value);
			}
		}
	}
</script>

<style scoped>
	.userrate {
		margin-top: 5px;
	}
</style>
