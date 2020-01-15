angular
	.module('app.pejabatPenilai.controller', [])
	.controller('pejabat.controller', PejabatController)
	.controller('pejabat.home.controller', PejabatHomeController)
	.controller('pejabat.nilai.controller', PejabatNiliaController)
	.controller('pejabat.pegawai.controller', PejabatPegawaiController);

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
			AuthService.profile().then((x) => {
				PegawaiService.pejabatGetPegawaiByPeriodeId(data.idperiode).then((z) => {
					$scope.datas = z;
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
		TargetSkpService.saveRealisasi(data).then((x) => {
			message.info('Data Berhasil Disimpan');
		});
	};

	$scope.changeValue = function(data) {
		var nilai = PenilaianSkpService.penilaianStruktural(data, data.realisasi);
		data.total = nilai.total;
		data.capaian = nilai.capaian;
	};
}
