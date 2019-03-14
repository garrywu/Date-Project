<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-cascades"></i> AI匹配结果</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<!-- 			<el-form>
			<el-form-item v-model="form.username">
			</el-form-item>
			</el-form> -->
			<p>当前匹配用户为: {{ tableData[0].customerName }}</p>
			<br />
			<div width='100%'>
				<el-row :span="24">
					<el-col :span="11">
						<div class="get-search" >
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<span>AI系统将为以下用户进行匹配</span>
								</div>
								<div>
									<el-form label-position="left" inline class="demo-table-expand">
										<el-form-item label="姓名">
											<span>{{ tableData[0].customerName }}</span>
										</el-form-item>
										<el-form-item label="出生地">
											<span>{{ tableData[0].birthPlace }}</span>
										</el-form-item>
										<el-form-item label="职位">
											<span>{{ tableData[0].profession }}</span>
										</el-form-item>
										<el-form-item label="联系方式">
											<span>{{ tableData[0].phoneNumber }}</span>
										</el-form-item>
										<el-form-item label="年薪">
											<span>{{ tableData[0].salary }}</span>
										</el-form-item>
										<el-form-item label="房产数量">
											<span>{{ tableData[0].houseNumber }}</span>
										</el-form-item>
										<el-form-item label="个人爱好">
											<span>{{ tableData[0].hobby }}</span>
										</el-form-item>
										<el-form-item label="是否离异">
											<span>{{ tableData[0].isDivorce }}</span>
										</el-form-item>
										<el-form-item label="个性描述"> <span>{{ tableData[0].personality }}</span>
										</el-form-item>
										<el-form-item label="相亲要求"> <span>{{ tableData[0].requirement }}</span>
										</el-form-item>
									</el-form>
								</div>
							</el-card>
						</div>
					</el-col>

					<el-col :span="2">
						<div style="width: 100%;">&nbsp;</div>
					</el-col>

					<el-col :span="11">
						<div class="get-result" >
							<div class="block">
								<el-carousel height="500px">
									<el-carousel-item v-for="item in 4" :key="item">
										<el-card class="box-card">
											<div slot="header" class="clearfix">
												<span>匹配度第{{ item }}名 AI加权分：{{ match }}%</span>
												<el-button style="float: right; padding: 3px 0" type="text" @click="arrangeDate(tableData[0].customerName,targetData[item].customerName)">安排相亲</el-button>
											</div>
											<div>
												<el-form label-position="left" inline class="demo-table-expand">
													<el-form-item label="姓名">
														<span>{{ targetData[item].customerName }}</span>
													</el-form-item>
													<el-form-item label="出生地">
														<span>{{ targetData[item].birthPlace }}</span>
													</el-form-item>
													<el-form-item label="职位">
														<span>{{ targetData[item].profession }}</span>
													</el-form-item>
													<el-form-item label="联系方式">
														<span>{{ targetData[item].phoneNumber }}</span>
													</el-form-item>
													<el-form-item label="年薪">
														<span>{{ targetData[item].salary }}</span>
													</el-form-item>
													<el-form-item label="房产数量">
														<span>{{ targetData[item].houseNumber }}</span>
													</el-form-item>
													<el-form-item label="个人爱好">
														<span>{{ targetData[item].hobby }}</span>
													</el-form-item>
													<el-form-item label="是否离异">
														<span>{{ targetData[item].isDivorce }}</span>
													</el-form-item>
													<el-form-item label="个性描述"> <span>{{ targetData[item].personality }}</span>
													</el-form-item>
													<el-form-item label="相亲要求"> <span>{{ targetData[item].requirement }}</span>
													</el-form-item>
												</el-form>
											</div>
										</el-card>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	export default {
		data() {
			return {
				url: '',
				show: true,
				tableData: [],
				match: '80',
				targetData: [],
				username: '张三',
				defaultVisible: '',
				dragOptions: {
					animation: 120,
					scroll: true,
					group: 'sortlist',
					ghostClass: 'ghost-style'
				},
				form: {
					customerName: '李易峰',
					birthday: '1993-01-01',
					address: '文汇路111号'
				},
				del_list: [],
				cur_page: 1,
				multipleSelection: [],
				select_cate: '',
				select_word: '',
				idx: -1

			}
		},
		created() {
			this.getData();
			this.getTData()
		},
// 				computed: {
// 					data() {
// 						return this.tableData.filter((d) => {
// 							let is_del = false;
// 							for (let i = 0; i < this.del_list.length; i++) {
// 								if (d.customerName === this.del_list[i].customerName) {
// 									is_del = true;
// 									break;
// 								}
// 							}
// 							if (!is_del) {
// 								if (d.customerName.indexOf(this.select_word) > -1 ||
// 									d.address.indexOf(this.select_word) > -1 ||
// 									d.birthday.indexOf(this.select_word) > -1) {
// 									return d;
// 								}
// 							}
// 						})
// 					}
// 				},
		methods: {
			jump() {
				this.$router.push({
					path: '/QueryUser'
				})
			},
			getData() {
				// 开发环境使用 easy-mock 数据，正式环境使用 json 文件
				if (process.env.NODE_ENV === 'development') {
					// this.url = '/ms/query/list';
					this.url = 'https://www.easy-mock.com/mock/5c6c0a072be418020f2f8198/example/ms/query/list';
				};
				this.$axios.post(this.url, {
					page: this.cur_page
				}).then((res) => {
					this.tableData = res.data.list;
				})
			},
			getTData() {
				// 开发环境使用 easy-mock 数据，正式环境使用 json 文件
				if (process.env.NODE_ENV === 'development') {
					// this.url = '/ms/query/list';
					this.url = 'https://www.easy-mock.com/mock/5c6c0a072be418020f2f8198/example/ms/query/ai';
				};
				this.$axios.post(this.url, {
					page: this.cur_page
				}).then((res) => {
					this.targetData = res.data.ai;
					//alert(JSON.stringify(this.targetData[2]));
				})
			},
			arrangeDate(mname,fname){
				this.$router.push({
					name: 'DateManagement',
					params: { mname: mname, fname:fname}
				})
			}

		}
	}
</script>

<style scoped>
	.drag-box {
		display: flex;
		user-select: none;
	}

	.drag-box-item {
		flex: 1;
		max-width: 330px;
		min-width: 300px;
		background-color: #eff1f5;
		margin-right: 16px;
		border-radius: 6px;
		border: 1px #e1e4e8 solid;
	}

	.item-title {
		padding: 8px 8px 8px 12px;
		font-size: 14px;
		line-height: 1.5;
		color: #24292e;
		font-weight: 600;
	}

	.item-ul {
		padding: 0 8px 8px;
		height: 500px;
		overflow-y: scroll;
	}

	.item-ul::-webkit-scrollbar {
		width: 0;
	}

	.drag-list {
		border: 1px #e1e4e8 solid;
		padding: 10px;
		margin: 5px 0 10px;
		list-style: none;
		background-color: #fff;
		border-radius: 6px;
		cursor: pointer;
		-webkit-transition: border .3s ease-in;
		transition: border .3s ease-in;
	}

	.drag-list:hover {
		border: 1px solid #20a0ff;
	}

	.drag-title {
		font-weight: 400;
		line-height: 25px;
		margin: 10px 0;
		font-size: 22px;
		color: #1f2f3d;
	}

	.ghost-style {
		display: block;
		color: transparent;
		border-style: dashed
	}

	.wait-for-search {
		background-color: #409EFF;
		height: 546px;
	}

	.wait-for-result {
		background-color: #67C23A;
		height: 546px;
	}

	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		padding-left: 0px;
		width: 50%;
	}

	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 150px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: white;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: white;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 560px;
	}
</style>
