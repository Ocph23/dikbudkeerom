'use strict';
angular
	.module('app.pegawai.controller', [])
	.controller('pegawai.controller', PegawaiController)
	.controller('pegawai.home.controller', HomeController)
	.controller('pegawai.skp.controller', SkpController)
	.controller('pegawai.realisasi.controller', RealisasiController)
	.controller('pegawai.inputrealisasi.controller', InputRealisasiController)
	.controller('pegawai.inputskp.controller', InputSkpController);
function PegawaiController($scope, AuthService, $state) {
	AuthService.Init([ 'pegawai' ]);
}

function HomeController($scope, AuthService, $state) {}

function SkpController($scope, PeriodeService, SkpService, PegawaiService, AuthService, message) {
	$scope.datas = [];
	$scope.canaddskp = false;
	PeriodeService.aktifPeriode().then((m) => {
		$scope.periode = m;
		AuthService.profile().then((n) => {
			SkpService.get(n.idpegawai).then((z) => {
				$scope.datas = z;
				var dataExists = $scope.datas.find((x) => x.idperiode === m.idperiode);
				if (!dataExists) {
					$scope.canaddskp = true;
				}
				PegawaiService.getPejabatPenilai().then((r) => {
					$scope.Pejabat = r;
				});
			});
		});
	});

	$scope.create = function() {
		AuthService.profile().then((x) => {
			$scope.model = {};
			$scope.model.idperiode = $scope.periode.idperiode;
			$scope.model.idpegawai = x.idpegawai;
			$scope.model.idjabatan = x.idjabatan;
			$scope.model.tahun = $scope.periode.tahun;
		});
	};
	$scope.selectedItem = function(data) {
		$scope.model = angular.copy(data);
		$scope.model.tahun = data.periode.tahun;
	};

	$scope.save = function(data) {
		data.idpejabatpenilai = data.pejabatPenilai.idpejabat;
		data.idatasanpejabat = data.atasanPejabatPenilai.idpejabat;
		if (data.idskp === undefined) {
			SkpService.post(data).then((x) => {
				message.info('Data Berhasil Ditambah');
			});
		} else {
			SkpService.put(data).then((x) => {
				message.info('Data Berhasil Ditambah');
			});
		}
	};
}

function RealisasiController($scope, AuthService, SkpService) {
	$scope.datas = [];
	$scope.canaddskp = false;
	AuthService.profile().then((x) => {
		SkpService.get(x.idpegawai).then((x) => {
			$scope.datas = x;
		});
	});

	$scope.save = function(data) {
		if (data.idskp === undefined) {
			$scope.datas.push(data);
		}
	};
}

function InputSkpController(
	$scope,
	AuthService,
	SatuanKerjaService,
	TargetSkpService,
	SkpService,
	$stateParams,
	$state,
	message
) {
	var idskp = $stateParams.Id;
	var idperiode = $stateParams.idperiode;
	var skp = {};
	AuthService.profile().then((profile) => {
		SkpService.get(profile.idpegawai).then((z) => {
			skp = z.find((x) => x.idskp == idskp);
			if (!skp) {
				$scope.canaddskp = true;
			}
			$scope.jenisJabatan = skp.pegawai.jabatan.jenis;
			$scope.datas = [];
			$scope.SatuanKerja = [];
			TargetSkpService.getSkpItemById(idskp).then((x) => {
				$scope.datas = x;
				if ($scope.jenisJabatan == 'Struktural') {
					$scope.JenisKegiatan = [ 'Pokok', 'Tambahan', 'Penunjang', 'Kreatifitas' ];
				} else {
					SatuanKerjaService.get(skp.idjabatan).then((x) => {
						$scope.SatuanKerja = x;
					});
				}
			});
		});
	});

	$scope.create = function() {
		$scope.model = {
			jenisJabatan: skp.pegawai.jabatan.jenis,
			idskp: skp.idskp,
			idpegawai: skp.idpegawai,
			waktu: 12,
			kualitas: 100,
			kuantitas: 0,
			biaya: 0
		};
	};
	$scope.selectTypeAhead = function(data) {
		setTimeout((x) => {
			$scope.model.idsatuankerja = data.idsatuankerja;
			$scope.model.jenis = data.jenis;
			$scope.model.bobot = data.bobot;
		}, 100);
	};
	$scope.selectedItem = function(data) {
		$scope.model = angular.copy(data);
	};
	$scope.save = function(data) {
		if (data.idtargetskp === undefined) {
			TargetSkpService.post(data).then((x) => {
				$scope.model = {};
				message.info('Data Berhasil Ditambah');
			});
		} else {
			TargetSkpService.put(data).then((x) => {
				message.info('Data Berhasil Diubah');
				var item = $scope.datas.find((x) => x.idtargetskp === data.idtargetskp);
				if (item) {
					item.kualitas = data.kualitas;
					item.kuantitas = data.kuantitas;
					item.kegiatan = data.kegiatan;
					item.waktu = data.waktu;
					item.biaya = data.biaya;
				}

				$scope.model = {};
				$('exampleModal').modal('hide');
			});
		}
	};

	$scope.print = function() {
		$state.go('reportformskp', { Id: idskp });
	};
}

function InputRealisasiController(
	$scope,
	$state,
	AuthService,
	TargetSkpService,
	$stateParams,
	message,
	PeriodeService
) {
	var idskp = $stateParams.Id;
	var idperiode = $stateParams.idperiode;
	var skp = {};
	$scope.data = {};
	PeriodeService.aktifPeriode().then((m) => {
		$scope.periode = m;
		TargetSkpService.getRealisasi(idskp).then((x) => {
			$scope.data = x;
		});
	});

	$scope.create = function() {
		AuthService.profile().then((pegawai) => {
			$scope.model = {
				idperiode: periode.idperiode,
				idpegawai: pegawai.idpegawai,
				waktu: 12,
				kualitas: 100,
				kuantitas: 0,
				biaya: 0
			};
		});
	};
	$scope.selectedItem = function(data) {
		$scope.model = angular.copy(data);
	};
	$scope.save = function(data) {
		TargetSkpService.saveRealisasi(data).then((x) => {
			message.info('Data Berhasil Disimpan');
		});
	};
	$scope.print = function() {
		$state.go('reportskp', { Id: idskp });
	};
}
