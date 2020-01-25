angular
	.module('app.pejabatPenilai.controller', [])
	.controller('pejabat.controller', PejabatController)
	.controller('pejabat.home.controller', PejabatHomeController)
	.controller('pejabat.pegawai.controller', PejabatPegawaiController)
	.controller('pejabat.persetujuan.controller', PersetujuanPegawaiController)
	.controller('pejabat.setujuinilai.controller', PejabatSetujuiNiliaController)
	.controller('pejabat.nilai.controller', PejabatNiliaController);

function PejabatController($scope, AuthService, $state) {
	AuthService.Init([ 'pejabat' ]);
	$scope.user = AuthService.getUserName();
	$state.go('pejabat-home');
}

function PejabatHomeController($scope, AuthService, $state) {
	AuthService.profile().then((x) => {});
}

function PejabatPegawaiController($scope, AuthService, PegawaiService, PeriodeService) {
	PeriodeService.get().then((x) => {
		$scope.periodes = x;
		PeriodeService.aktifPeriode().then((m) => {
			$scope.periode = m;
		});
	});

	$scope.SelectedPeriode = function(data) {
		setTimeout((x) => {
			$scope.datas = [];
			AuthService.profile().then((profile) => {
				PegawaiService.pejabatGetPegawaiByPeriodeId(data.idperiode).then((z) => {
					$scope.datas = z.filter((x) => x.pejabatPenilai.idpegawai == profile.idpegawai);
				});
			});
		}, 500);
	};

	$scope.canChangeData = function(data) {
		$scope.periode;
	};
}

function PersetujuanPegawaiController($scope, AuthService, PegawaiService, PeriodeService) {
	PeriodeService.get().then((x) => {
		$scope.periodes = x;
		PeriodeService.aktifPeriode().then((m) => {
			$scope.periode = m;
		});
	});

	$scope.SelectedPeriode = function(data) {
		setTimeout((x) => {
			$scope.datas = [];
			AuthService.profile().then((profile) => {
				PegawaiService.pejabatGetPegawaiByPeriodeId(data.idperiode).then((z) => {
					$scope.datas = z.filter((x) => x.atasanPejabatPenilai.idpegawai == profile.idpegawai);
				});
			});
		}, 500);
	};

	$scope.canChangeData = function(data) {
		$scope.periode;
	};
}

function PejabatNiliaController(
	$scope,
	SkpService,
	PenilaianSkpService,
	TargetSkpService,
	$stateParams,
	message,
	$state,
	AuthService,
	PeriodeService
) {
	var idskp = $stateParams.Id;
	AuthService.profile().then((x) => {
		SkpService.getBySkpId(x.idpegawai, idskp).then((skp) => {
			$scope.skp = skp;
			$scope.Penilaian = {};
			$scope.periode = {};
			TargetSkpService.getRealisasi($scope.skp.idskp).then((m) => {
				$scope.Penilaian = m;
				PeriodeService.aktifPeriode().then((x) => {
					$scope.periode = x;
				});
			});
		});
	});

	$scope.save = function(data) {
		var cansave = true;
		data.targetskps.forEach((element) => {
			if (element.kualitas <= 0) {
				cansave = false;
				return;
			}
		});

		if (cansave) {
			TargetSkpService.saveRealisasi(data).then((x) => {
				$scope.skp.persetujuanpenilai = true;
				SkpService.put($scope.skp).then((x) => {
					message.info('Data Berhasil Disimpan');
				});
			});
		}
	};

	$scope.changeValue = function(data) {
		var nilai = PenilaianSkpService.penilaianStruktural(data, data.realisasi);
		data.total = nilai.total;
		data.capaian = nilai.capaian;
	};
	$scope.print = function() {
		$state.go('reportskp', { Id: $scope.skp.idskp });
	};
}

function PejabatSetujuiNiliaController(
	$scope,
	SkpService,
	PenilaianSkpService,
	TargetSkpService,
	$stateParams,
	message,
	$state,
	AuthService,
	PeriodeService
) {
	var idskp = $stateParams.Id;
	AuthService.profile().then((x) => {
		SkpService.getBySkpId(x.idpegawai, idskp).then((skp) => {
			$scope.skp = skp;

			$scope.Penilaian = {};
			$scope.periode = {};
			TargetSkpService.getRealisasi($scope.skp.idskp).then((m) => {
				$scope.Penilaian = m;
				PeriodeService.aktifPeriode().then((x) => {
					$scope.periode = x;
				});
			});
		});
	});

	$scope.save = function(data) {
		$scope.skp.persetujuanatasan = true;
		SkpService.put($scope.skp).then((x) => {
			message.info('Data Berhasil Disimpan');
		});
	};

	$scope.changeValue = function(data) {
		var nilai = PenilaianSkpService.penilaianStruktural(data, data.realisasi);
		data.total = nilai.total;
		data.capaian = nilai.capaian;
	};
	$scope.print = function() {
		$state.go('reportskp', { Id: $scope.skp.idskp });
	};
}
