angular
	.module('app.admin.controller', [])
	.controller('admin.controller', AdminController)
	.controller('admin.home.controller', adminHomeController)
	.controller('admin.pegawai.controller', adminPegawaiController)
	.controller('admin.periode.controller', adminPeriodeController)
	.controller('admin.pejabatpenilai.controller', adminPejabatpenilaiController)
	.controller('admin.addpejabatpenilai.controller', adminAddPejabatpenilaiController)
	.controller('admin.kegiatan.controller', adminKegiatanController)
	.controller('admin.jabatan.controller', adminJabatanController)
	.controller('admin.satuankerja.controller', adminSatuanKerjaController)
	.controller('admin.perilaku.controller', adminPerilakuController);

function AdminController($scope, AuthService, $state) {
	AuthService.Init([ 'admin' ]);
	$scope.user = AuthService.getUserName();
	$state.go('admin-home');
}

function adminHomeController($scope, AuthService) {}
function adminPeriodeController($scope, AuthService, PeriodeService, message) {
	PeriodeService.get().then((response) => {
		$scope.datas = response;
	});

	$scope.selectedItem = function(data) {
		$scope.model = angular.copy(data);
		$scope.model.tanggalpengajuan = new Date($scope.model.tanggalpengajuan);
		$scope.model.tanggalrealisasi = new Date($scope.model.tanggalrealisasi);
	};
	$scope.save = function(model) {
		if (model.idperiode === undefined) {
			PeriodeService.post(model).then((response) => {
				message.info('Data Berhasil Disimpan');
				$scope.model = {};
			});
		} else {
			PeriodeService.put(model).then((response) => {
				var data = $scope.datas.find((x) => x.idperilaku == model.idperilaku);
				if (data) {
					data.perilaku = model.perilaku;
				}
				message.info('Data Berhasil Disimpan');
				$scope.model = {};
			});
		}
	};

	$scope.delete = function(data) {
		message.dialog('Yakin Hapus Data ?', 'Ya', 'Tidak').then(
			(x) => {
				PeriodeService.delete(data.idperilaku).then((x) => {
					var index = $scope.datas.indexOf(data);
					$scope.datas.splice(index, 1);
				});
			},
			(err) => {}
		);
	};
}
function adminPegawaiController($scope, PegawaiService, swangular) {
	PegawaiService.get().then(
		(response) => {
			$scope.pegawais = response;
		},
		(err) => {}
	);
	$scope.SelectedItem = function(data) {};

	$scope.verifikasi = function(data) {
		var text = 'Yakin Mengaktifkan Akun ?';
		if (data.status) text = 'Yakin Menonaktifkan Akun ?';
		swangular
			.swal({
				title: 'Confirm',
				text: text,
				inputAttributes: {
					autocapitalize: 'off'
				},
				showCancelButton: true,
				confirmButtonText: 'OK',
				showLoaderOnConfirm: true,
				preConfirm: (x) => {
					return new Promise(function(resolve) {
						PegawaiService.verifikasi(data).then((x) => {
							swangular.swal({
								title: 'Berhasil !'
							});
							data.status = !data.status;
						});
					});
				},
				allowOutsideClick: () => false
			})
			.then((result) => {});
	};
}

function adminPejabatpenilaiController($scope, PegawaiService, message) {
	PegawaiService.getPejabatPenilai().then(
		(response) => {
			$scope.pegawais = response;
		},
		(err) => {}
	);
}
function adminAddPejabatpenilaiController($scope, PegawaiService, message) {
	$scope.model = null;

	$scope.searchChange = function() {
		$scope.model = null;
	};
	$scope.find = function(nip) {
		PegawaiService.findNotAsPejabat(nip).then(
			(x) => {
				$scope.model = x;
				$scope.model.tmtShow = new Date($scope.model.tmt).toLocaleDateString();
			},
			(err) => {
				message.error(err);
			}
		);
	};

	$scope.setAsPejabat = function(pegawai) {
		PegawaiService.setAsPejabat(pegawai).then(
			(x) => {
				message.info('Pegawai Berhasil Dipilih Sebagai Pejabat Penilai');
				$scope.model = null;
				$scope.nip = '';
			},
			(err) => {
				message.error(err);
			}
		);
	};
}

function adminKegiatanController($scope, KegiatanService, message) {
	KegiatanService.get().then((response) => {
		$scope.datas = response;
	});

	$scope.selectedItem = function(data) {
		$scope.model = angular.copy(data);
	};
	$scope.save = function(model) {
		if (model.idtargetskp === undefined) {
			KegiatanService.post(model).then((response) => {
				message.info('Data Berhasil Disimpan');
				$scope.model = {};
			});
		} else {
			KegiatanService.put(model).then((response) => {
				var data = $scope.datas.find((x) => x.idtargetskp == model.idtargetskp);
				if (data) {
					data.namakegiatan = model.namakegiatan;
					data.pangkat = model.pangkat;
					data.bobot = model.bobot;
					data.kuantitas = model.kuantitas;
				}
				message.info('Data Berhasil Disimpan');
				$scope.model = {};
			});
		}
	};

	$scope.delete = function(data) {
		message.dialog('Yakin Hapus Data ?', 'Ya', 'Tidak').then(
			(x) => {
				KegiatanService.delete(data.idtargetskp).then((x) => {
					var index = $scope.datas.indexOf(data);
					$scope.datas.splice(index, 1);
				});
			},
			(err) => {}
		);
	};
}
function adminPerilakuController($scope, PerilakuService, message) {
	PerilakuService.get().then((response) => {
		$scope.datas = response;
	});

	$scope.selectedItem = function(data) {
		$scope.model = angular.copy(data);
	};
	$scope.save = function(model) {
		if (model.idperilaku === undefined) {
			PerilakuService.post(model).then((response) => {
				message.info('Data Berhasil Disimpan');
				$scope.model = {};
			});
		} else {
			PerilakuService.put(model).then((response) => {
				var data = $scope.datas.find((x) => x.idperilaku == model.idperilaku);
				if (data) {
					data.perilaku = model.perilaku;
				}
				message.info('Data Berhasil Disimpan');
				$scope.model = {};
			});
		}
	};

	$scope.delete = function(data) {
		message.dialog('Yakin Hapus Data ?', 'Ya', 'Tidak').then(
			(x) => {
				PerilakuService.delete(data.idperilaku).then((x) => {
					var index = $scope.datas.indexOf(data);
					$scope.datas.splice(index, 1);
				});
			},
			(err) => {}
		);
	};
}

function adminJabatanController($scope, JabatanService, message) {
	$scope.JenisJabatan = [ 'Struktural', 'Fungsional' ];

	JabatanService.get().then((response) => {
		$scope.datas = response;
	});

	$scope.selectedItem = function(data) {
		$scope.model = angular.copy(data);
	};
	$scope.save = function(model) {
		if (model.idjabatan === undefined) {
			JabatanService.post(model).then((response) => {
				message.info('Data Berhasil Disimpan');
				$scope.model = {};
			});
		} else {
			JabatanService.put(model).then((response) => {
				var data = $scope.datas.find((x) => x.idperilaku == model.idperilaku);
				if (data) {
					data.perilaku = model.perilaku;
				}
				message.info('Data Berhasil Disimpan');
				$scope.model = {};
			});
		}
	};

	$scope.delete = function(data) {
		message.dialog('Yakin Hapus Data ?', 'Ya', 'Tidak').then(
			(x) => {
				JabatanService.delete(data.idperilaku).then((x) => {
					var index = $scope.datas.indexOf(data);
					$scope.datas.splice(index, 1);
				});
			},
			(err) => {}
		);
	};
}
function adminSatuanKerjaController($scope, $stateParams, SatuanKerjaService, message) {
	$scope.Jabatan = $stateParams.data;
	$scope.Kegiatan = [ 'Pembelajaran Dan Bimbingan', 'Tugas Tertentu', 'Tugas Tambahan' ];
	SatuanKerjaService.get($scope.Jabatan.idjabatan).then((x) => {
		$scope.datas = x;
	});

	$scope.selectedItem = function(data) {
		$scope.model = angular.copy(data);
	};
	$scope.save = function(model) {
		model.idjabatan = $scope.Jabatan.idjabatan;
		if (model.idsatuankerja === undefined) {
			SatuanKerjaService.post(model).then((response) => {
				message.info('Data Berhasil Disimpan');
				$scope.model = {};
			});
		} else {
			SatuanKerjaService.put(model).then((response) => {
				var data = $scope.datas.find((x) => x.idsatuankerja == model.idsatuankerja);
				if (data) {
					data.kegiatan = model.kegiatan;
					data.bobot = model.bobot;
				}
				message.info('Data Berhasil Disimpan');
				$scope.model = {};
			});
		}
	};

	$scope.delete = function(data) {
		message.dialog('Yakin Hapus Data ?', 'Ya', 'Tidak').then(
			(x) => {
				SatuanKerjaService.delete(data.idsatuankerja).then((x) => {
					var index = $scope.datas.indexOf(data);
					$scope.datas.splice(index, 1);
				});
			},
			(err) => {}
		);
	};
}
