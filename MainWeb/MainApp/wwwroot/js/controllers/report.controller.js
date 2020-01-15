angular
	.module('app.report.controller', [])
	.controller('report.controller', ReportController)
	.controller('report.skp.controller', SkpController)
	.controller('report.formskp.controller', FormSkpController);
function ReportController() {}
function SkpController($scope, SkpService, TargetSkpService, AuthService, $stateParams) {
	var idskp = $stateParams.Id;
	AuthService.profile().then((x) => {
		SkpService.getBySkpId(x.idpegawai, idskp).then((skp) => {
			$scope.skp = skp;
			$scope.Penilaian = {};
			$scope.periode = {};
			TargetSkpService.getRealisasi($scope.skp.idskp).then((m) => {
				$scope.Penilaian = m;
				$scope.total = hitung($scope.Penilaian);
				setTimeout((x) => {
					window.print();
				}, 500);
			});
		});
	});

	$scope.jumlah = function() {
		var a = $scope.Penilaian.perilaku.reduce((x, y) => {
			return x + y.nilaiperilaku.nilai;
		}, 0);
		return a;
	};

	$scope.nilaiText = function(nilai) {
		return nilai <= 50 ? 'Kurang' : nilai < 80 ? 'Baik' : 'Sempurna';
	};
	$scope.sumAK = function(data) {
		if (data) {
			var a = data.reduce((x, y) => {
				return x + y.bobot * y.kuantitas;
			}, 0);
			return a;
		}
	};
	$scope.sumCapaian = function(data) {
		if (data) {
			var a = data.reduce((x, y) => {
				return x + y.capaian;
			}, 0);
			return a;
		}
	};
}
function FormSkpController($scope, SkpService, TargetSkpService, AuthService, $stateParams, $state) {
	var idskp = $stateParams.Id;
	$scope.idskp = $stateParams.Id;
	$scope.skp = {};
	$scope.datas = [];
	AuthService.profile().then((x) => {
		SkpService.getBySkpId(x.idpegawai, idskp).then((skp) => {
			$scope.skp = skp;
			$scope.Penilaian = {};
			$scope.periode = {};
			TargetSkpService.getRealisasi($scope.skp.idskp).then((m) => {
				$scope.Penilaian = m;
				$scope.datas = m.targetskps.group(function(item) {
					return item.jenis;
				});
				setTimeout((x) => {
					window.print();
				}, 500);
			});
		});
	});
	$scope.sumAK = function(data) {
		if (data) {
			var a = data.reduce((x, y) => {
				return x + y.bobot * y.kuantitas;
			}, 0);
			return a;
		}
	};
	Object.defineProperty(Array.prototype, 'group', {
		enumerable: false,
		value: function(key) {
			var map = {};
			this.forEach(function(e) {
				var k = key(e);
				map[k] = map[k] || [];
				map[k].push(e);
			});
			return Object.keys(map).map(function(k) {
				return { key: k, data: map[k] };
			});
		}
	});
}
