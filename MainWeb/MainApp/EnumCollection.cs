using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace MainApp {

    [JsonConverter (typeof (StringEnumConverter))]
    public enum StatusPeriode {
        Buka,
        Tutup
    }

    [JsonConverter (typeof (StringEnumConverter))]
    public enum JenisKegiatan {
        Pokok,
        Tambahan,
        Kreatifitas
    }

    [JsonConverter (typeof (StringEnumConverter))]
    public enum JenisJabatan {
        Struktural,
        Fungsional
    }

}