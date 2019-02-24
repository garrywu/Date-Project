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
			<p>当前匹配用户为: {{ username }}</p>
			<br />
			<div width='100%'>
				<el-row :span="24">
					<el-col :span="11">
						<div class="wait-for-search" v-if="show">
							<div style="width:50%;display: block;margin: 0rem auto; padding-top: 70px;">
								<i class="el-icon-lx-peoplefill" style="font-size: 300px; color: white;"></i>
								<el-button type="primary" icon="el-icon-edit" @click="jump" style="font-size: 30px;">选择用户进行匹配</el-button>
							</div>
						</div>
					</el-col>

					<el-col :span="11">
						<div class="get-search" v-if="!show">
							<el-form ref="form" label-position="left" inline class="demo-table-expand" :data="data">
								<el-form-item label="姓名">
									<span>{{ form.username }}</span>
								</el-form-item>
								<el-form-item label="出生日期">
									<span>{{ form.birthdate }}</span>
								</el-form-item>
								<el-form-item label="工作地">
									<span>{{ form.address }}</span>
								</el-form-item>
							</el-form>
						</div>
					</el-col>

					<el-col :span="2">
						<div style="width: 100%;">&nbsp;</div>
					</el-col>
					<el-col :span="11">
						<div class="wait-for-result" v-if="show">
							<div style="width:50%;display: block;margin: 0rem auto; padding-top: 70px;">
								<i class="el-icon-lx-group" style="font-size: 300px; color: white;"></i>
								<el-button type="success" icon="el-icon-lx-warn" style="font-size: 30px;">目前没有匹配结果</el-button>
							</div>
						</div>
					</el-col>

					<el-col :span="11">
						<div class="get-result" v-if="!show">
							<div class="block">
								<el-carousel height="500px">
									<el-carousel-item v-for="item in 4" :key="item">
										<el-card class="box-card">
											<div slot="header" class="clearfix">
												<span>匹配度第{{ item }}名 AI加权分：{{ match }}%</span>
												<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
											</div>
											<div>
												<el-form label-position="left" inline class="demo-table-expand">
													<el-form-item label="姓名">
														<span>{{ targetData[item].username }}</span>
													</el-form-item>
													<el-form-item label="出生地">
														<span>{{ targetData[item].birthlocation }}</span>
													</el-form-item>
													<el-form-item label="职位">
														<span>{{ targetData[item].jobtitle }}</span>
													</el-form-item>
													<el-form-item label="联系方式">
														<span>{{ targetData[item].mobile }}</span>
													</el-form-item>
													<el-form-item label="年薪">
														<span>{{ targetData[item].salary }}</span>
													</el-form-item>
													<el-form-item label="房产数量">
														<span>{{ targetData[item].housenumber }}</span>
													</el-form-item>
													<el-form-item label="个人爱好">
														<span>{{ targetData[item].hobby }}</span>
													</el-form-item>
													<el-form-item label="是否离异">
														<span>{{ targetData[item].divorce }}</span>
													</el-form-item>
													<el-form-item label="个性描述"> <span>{{ targetData[item].charactor }}</span>
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
					username: '李易峰',
					birthdate: '1993-01-01',
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
			this.aiSearch();
			this.getData();
			this.getTData()
		},
		// 		computed: {
		// 			data() {
		// 				return this.tableData.filter((d) => {
		// 					let is_del = false;
		// 					for (let i = 0; i < this.del_list.length; i++) {
		// 						if (d.username === this.del_list[i].username) {
		// 							is_del = true;
		// 							break;
		// 						}
		// 					}
		// 					if (!is_del) {
		// 						if (d.username.indexOf(this.select_word) > -1 ||
		// 							d.address.indexOf(this.select_word) > -1 ||
		// 							d.birthdate.indexOf(this.select_word) > -1) {
		// 							return d;
		// 						}
		// 					}
		// 				})
		// 			}
		// 		},
		methods: {
			jump() {
				this.$router.push({
					path: '/QueryUser'
				})
			},
			aiSearch() {
				//alert("222");
				//alert(this.$route.params.cal);
				if (this.$route.params.cal == 'ais') {
					this.show = false;
				}
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
