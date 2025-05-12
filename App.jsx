```jsx
import React, { useState, useEffect } from 'react';

export default function App() {
  // State for form inputs
  const [formData, setFormData] = useState({
    procedure: '',
    tumorSite: '',
    tumorSize: '',
    histology: '',
    histologicType: '',
    urothelialGrade: '',
    scCAdenoGrade: '',
    tumorConfigurations: [],
    lymphaticVascularInvasion: '',
    perineuralInvasion: '',
    tumorExtensions: [],
    rightUreteralMargin: '',
    leftUreteralMargin: '',
    urethralMargin: '',
    softTissueMargin: '',
    otherMargin: '',
    regionalLymphNodesExamined: '',
    lymphNodesInvolved: '',
    extranodalExtension: '',
    metastaticDeposit: '',
    lymphNodeSize: '',
    distantMetastasis: [],
    tnmDescriptors: [],
    primaryTumor: '',
    regionalLymphNodes: '',
    distantMetastasisStage: '',
    additionalFindings: [],
    associatedLesions: [],
    additionalNotes: '',
  });

  // Derived state for report generation
  const [report, setReport] = useState('');
  const [stage, setStage] = useState('');

  // Update report and stage whenever form data changes
  useEffect(() => {
    generateReport();
    calculateStage();
  }, [formData]);

  const handleSelectChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCheckboxChange = (field, value) => (e) => {
    const currentValues = formData[field];
    if (e.target.checked) {
      if (Array.isArray(currentValues)) {
        setFormData((prev) => ({ ...prev, [field]: [...currentValues, value] }));
      } else {
        setFormData((prev) => ({ ...prev, [field]: [value] }));
      }
    } else {
      if (Array.isArray(currentValues)) {
        setFormData((prev) => ({
          ...prev,
          [field]: currentValues.filter((item) => item !== value),
        }));
      }
    }
  };

  const handleTextChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const generateReport = () => {
    let result = '';

    // Add form sections to the report
    if (formData.procedure) result += `- İşlem: ${formData.procedure}\n`;
    if (formData.tumorSite) result += `- Tümör Lokalizasyonu: ${formData.tumorSite}\n`;
    if (formData.tumorSize) result += `- Tümör Boyutu: ${formData.tumorSize}\n`;
    if (formData.histology)
      result += `- Tümör Histolojisi ve İmmunohistokimyasal Bulgular:\n  - ${formData.histology}\n`;
    if (formData.histologicType) result += `- Histolojik Tip (WHO 5. Baskı): ${formData.histologicType}\n`;
    if (formData.urothelialGrade)
      result += `- Ürotelyal Karsinoma Histolojik Derecesi: ${formData.urothelialGrade}\n`;
    if (formData.scCAdenoGrade)
      result += `- Skuamöz Hücreli Karsinoma veya Adenokarsinoma Histolojik Derecesi: ${formData.scCAdenoGrade}\n`;

    if (formData.tumorConfigurations.length > 0) {
      result += `- Tümör Konfigürasyonu:\n`;
      formData.tumorConfigurations.forEach((config) => {
        result += `  - ${config}\n`;
      });
    }

    if (formData.lymphaticVascularInvasion)
      result += `- Lenfatik ve/veya Vasküler İnfültrasyon: ${formData.lymphaticVascularInvasion}\n`;
    if (formData.perineuralInvasion)
      result += `- Perinöral İnfültrasyon: ${formData.perineuralInvasion}\n`;

    if (formData.tumorExtensions.length > 0) {
      result += `- Tümör Ekstansiyonu:\n`;
      formData.tumorExtensions.forEach((ext) => {
        result += `  - ${ext}\n`;
      });
    }

    if (
      formData.rightUreteralMargin ||
      formData.leftUreteralMargin ||
      formData.urethralMargin ||
      formData.softTissueMargin ||
      formData.otherMargin
    ) {
      result += `\n- Rezeksiyon Marjları:\n`;
      if (formData.rightUreteralMargin)
        result += `  - Sağ Üreteral Marj: ${formData.rightUreteralMargin}\n`;
      if (formData.leftUreteralMargin)
        result += `  - Sol Üreteral Marj: ${formData.leftUreteralMargin}\n`;
      if (formData.urethralMargin)
        result += `  - Üretral Marj: ${formData.urethralMargin}\n`;
      if (formData.softTissueMargin)
        result += `  - Yumuşak Doku Marjı: ${formData.softTissueMargin}\n`;
      if (formData.otherMargin) result += `  - Diğer Marj(lar): ${formData.otherMargin}\n`;
    }

    if (
      formData.regionalLymphNodesExamined ||
      formData.lymphNodesInvolved ||
      formData.extranodalExtension ||
      formData.metastaticDeposit ||
      formData.lymphNodeSize
    ) {
      result += `\n- Bölgesel Lenf Nodları:\n`;
      if (formData.regionalLymphNodesExamined)
        result += `  - İncelenen Bölgesel Lenf Nodu Sayısı: ${formData.regionalLymphNodesExamined}\n`;
      if (formData.lymphNodesInvolved)
        result += `  - Etkilenen Lenf Nodu Sayısı: ${formData.lymphNodesInvolved}\n`;
      if (formData.extranodalExtension)
        result += `  - Ekstranodal Yayılım: ${formData.extranodalExtension}\n`;
      if (formData.metastaticDeposit)
        result += `  - En Büyük Metastatik Lezyon Boyutu (mm), Lokalizasyon: ${formData.metastaticDeposit}\n`;
      if (formData.lymphNodeSize)
        result += `  - En Büyük Etkilenen Lenf Nodu Boyutu (mm), Lokalizasyon: ${formData.lymphNodeSize}\n`;
    }

    if (formData.distantMetastasis.length > 0) {
      result += `\n- Uzak Metastaz:\n`;
      formData.distantMetastasis.forEach((metastasis) => {
        result += `  - ${metastasis}\n`;
      });
    }

    if (
      formData.tnmDescriptors.length > 0 ||
      formData.primaryTumor ||
      formData.regionalLymphNodes ||
      formData.distantMetastasisStage
    ) {
      result += `\n- Patolojik Evreleme Sınıflandırması (pTNM, AJCC 8. Edisyon):\n`;
      if (formData.tnmDescriptors.length > 0) {
        result += `  - TNM Tanımlayıcılar:\n`;
        formData.tnmDescriptors.forEach((desc) => {
          result += `    - ${desc}\n`;
        });
      }
      if (formData.primaryTumor) result += `  - Birincil Tümör (pT): ${formData.primaryTumor}\n`;
      if (formData.regionalLymphNodes)
        result += `  - Bölgesel Lenf Nodları (pN): ${formData.regionalLymphNodes}\n`;
      if (formData.distantMetastasisStage)
        result += `  - Uzak Metastaz (pM): ${formData.distantMetastasisStage}\n`;
    }

    if (formData.additionalFindings.length > 0) {
      result += `\n- Ek Patolojik Bulgular:\n`;
      formData.additionalFindings.forEach((finding) => {
        result += `  - ${finding}\n`;
      });
    }

    if (formData.associatedLesions.length > 0) {
      result += `\n- İlişkili Epitelyal Lezyonlar:\n`;
      formData.associatedLesions.forEach((lesion) => {
        result += `  - ${lesion}\n`;
      });
    }

    if (formData.additionalNotes)
      result += `\n- Ek Notlar:\n  - ${formData.additionalNotes}\n`;

    setReport(result);
  };

  const calculateStage = () => {
    // Simple staging based on pT, pN, pM values
    let calculatedStage = '';
    
    if (formData.primaryTumor && formData.regionalLymphNodes && formData.distantMetastasisStage) {
      const pT = formData.primaryTumor.split(':')[0].trim();
      const pN = formData.regionalLymphNodes.split(':')[0].trim();
      const pM = formData.distantMetastasisStage.split(':')[0].trim();
      
      calculatedStage = `${pT}${pN}${pM}`;
    }
    
    setStage(calculatedStage);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(report).then(() => {
      alert('Rapor panoya kopyalandı!');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold">Mesane Karsinomu Raporlama Sistemi</h1>
          <p className="text-blue-100 mt-1">US CAP protokolüne dayalı modern raporlama aracı</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Form Column */}
          <div className="space-y-6">
            {/* Gross Core Data Elements */}
            <section className="bg-white rounded-xl shadow-md p-6 transition-transform hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Gross Temel Veri Unsurları</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">İşlem</label>
                <select 
                  value={formData.procedure}
                  onChange={handleSelectChange('procedure')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  <option>Parçalı sistektomi</option>
                  <option>Radyal sistektomi (toplam sistektomi)</option>
                  <option>Radyal sistoprostatektomi</option>
                  <option>Anterior ekzenterasyon</option>
                  <option>Diğer (belirtin):</option>
                  <option>Belirtilmemiş</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tümör Lokalizasyonu</label>
                <select 
                  value={formData.tumorSite}
                  onChange={handleSelectChange('tumorSite')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  <option>Trigon</option>
                  <option>Sağ lateral duvar</option>
                  <option>Sol lateral duvar</option>
                  <option>Ön duvar</option>
                  <option>Arka duvar</option>
                  <option>Kubbe</option>
                  <option>Diğer (belirtin):</option>
                  <option>Belirtilmemiş</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tümör Boyutu</label>
                <select 
                  value={formData.tumorSize}
                  onChange={handleSelectChange('tumorSize')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  <option>En büyük boyut (mm):</option>
                  <option>Tüm boyutlar (mm x mm x mm):</option>
                  <option>Belirlenemiyor (açıklayın):</option>
                </select>
              </div>
            </section>

            {/* Microscopic Descriptions */}
            <section className="bg-white rounded-xl shadow-md p-6 transition-transform hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Mikroskopik Bulgular</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tümör Histolojisi ve İmmunohistokimyasal Bulgular</label>
                <textarea
                  value={formData.histology}
                  onChange={handleTextChange('histology')}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detayları girin..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Histolojik Tip (WHO 5. Baskı)</label>
                <select 
                  value={formData.histologicType}
                  onChange={handleSelectChange('histologicType')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  <option>Noninvaziv papiller ürotelyal karsinoma</option>
                  <option>Ürotelyal karsinoma in situ</option>
                  <option>İnvaziv ürotelyal karsinoma (konvansiyonel)</option>
                  <option>Mikrosistik ürotelyal karsinoma</option>
                  <option>Nested tip ürotelyal karsinoma</option>
                  <option>Tübüler ve mikrosistik ürotelyal karsinoma</option>
                  <option>Linfositoid benzeri ürotelyal karsinoma</option>
                  <option>Plazmasitoit ürotelyal karsinoma</option>
                  <option>Sarkomatoid ürotelyal karsinoma</option>
                  <option>Dev hücreli ürotelyal karsinoma</option>
                  <option>Düşük diferansiye ürotelyal karsinoma</option>
                  <option>Lipid-zengin ürotelyal karsinoma</option>
                  <option>Açık hücreli ürotelyal karsinoma</option>
                  <option>% ile birlikte skuamöz farklılaşma gösteren ürotelyal karsinoma</option>
                  <option>% ile birlikte glandüler farklılaşma gösteren ürotelyal karsinoma</option>
                  <option>% ile birlikte trofoblastik farklılaşma gösteren ürotelyal karsinoma</option>
                  <option>% ile birlikte Müllerian farklılaşma gösteren ürotelyal karsinoma</option>
                  <option>Skuamöz hücreli karsinoma</option>
                  <option>Verrüköz karsinoma</option>
                  <option>In situ skuamöz hücreli karsinoma (invaziv karsinoma yok)</option>
                  <option>Adenokarsinoma</option>
                  <option>Enterik adenokarsinoma</option>
                  <option>Mukinoz adenokarsinoma</option>
                  <option>Karma adenokarsinoma</option>
                  <option>Signet-ring hücreli adenokarsinoma</option>
                  <option>In situ adenokarsinoma (invaziv karsinoma yok)</option>
                  <option>Açık hücreli karsinoma</option>
                  <option>Endometroid karsinoma</option>
                  <option>% ile birlikte küçük hücreli nöroendokrin karsinoma</option>
                  <option>% ile birlikte büyük hücreli nöroendokrin karsinoma</option>
                  <option>% ile birlikte iyi diferansiye nöroendokrin karsinoma</option>
                  <option>Listelenmemiş diğer histolojik tip (belirtin):</option>
                  <option>Karsinoma tipi belirlenemiyor:</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ürotelyal Karsinoma Histolojik Derecesi</label>
                <select 
                  value={formData.urothelialGrade}
                  onChange={handleSelectChange('urothelialGrade')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  <option>Düşük derece</option>
                  <option>Yüksek derece</option>
                  <option>Diğer (belirtin):</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Skuamöz Hücreli Karsinoma veya Adenokarsinoma Histolojik Derecesi</label>
                <select 
                  value={formData.scCAdenoGrade}
                  onChange={handleSelectChange('scCAdenoGrade')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  <option>G1: İyi diferansiye</option>
                  <option>G2: Orta diferansiye</option>
                  <option>G3: Düşük diferansiye</option>
                  <option>GX: Değerlendirilemiyor</option>
                  <option>Diğer (belirtin):</option>
                  <option>Belirlenemiyor (açıklayın):</option>
                  <option>Uygulanamaz</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tümör Konfigürasyonu</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Papiller",
                    "Solid/nodül",
                    "Düz",
                    "Ülseratif",
                    "Belirlenemiyor",
                    "Diğer (belirtin):"
                  ].map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.tumorConfigurations.includes(option)}
                        onChange={handleCheckboxChange('tumorConfigurations', option)}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Lenfatik ve/veya Vasküler İnfültrasyon</label>
                <select 
                  value={formData.lymphaticVascularInvasion}
                  onChange={handleSelectChange('lymphaticVascularInvasion')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  <option>Tespit edilmemiş</option>
                  <option>Var</option>
                  <option>Belirlenemiyor</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Perinöral İnfültrasyon</label>
                <select 
                  value={formData.perineuralInvasion}
                  onChange={handleSelectChange('perineuralInvasion')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  <option>Tespit edilmemiş</option>
                  <option>Var</option>
                  <option>Belirlenemiyor</option>
                </select>
              </div>
            </section>

            {/* Tumor Extension */}
            <section className="bg-white rounded-xl shadow-md p-6 transition-transform hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Tümör Ekstansiyonu</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "Noninvaziv papiller karsinoma",
                  "Ürotelyal karsinoma in situ, “düz tümör”",
                  "Subepitelial bağ dokusuna invaze tümör",
                  "Muscularis propria'ya invaze tümör",
                  "Muscularis propria'nın yüzeyel (iç yarım)",
                  "Muscularis propria'nın derin (dış yarım)",
                  "Perivesikal doku invazyonu",
                  "Perivesikal doku invazyonu, mikroskobik",
                  "Perivesikal doku invazyonu, makroskobik",
                  "Komşu yapılara invazyon",
                  "Prostat (mesane tümöründen transmural invazyon)",
                  "Seminal veziküller",
                  "Rahim",
                  "Vajina",
                  "Adneksler",
                  "Pelvis duvarı",
                  "Karın duvarı",
                  "Rektum",
                  "Diğer (belirtin):",
                  "Değerlendirilemiyor"
                ].map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.tumorExtensions.includes(option)}
                      onChange={handleCheckboxChange('tumorExtensions', option)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Surgical Margins */}
            <section className="bg-white rounded-xl shadow-md p-6 transition-transform hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Rezeksiyon Marjları</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sağ Üreteral Marj</label>
                <select 
                  value={formData.rightUreteralMargin}
                  onChange={handleSelectChange('rightUreteralMargin')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  <option>Değerlendirilemiyor</option>
                  <option>İnvaziv karsinomla tutulmamış</option>
                  <option>İnvaziv karsinom ve CIS/noinvaziv ürotelyal karsinom tarafından tutulmamış, mesafe belirtin:</option>
                  <option>İnvaziv karsinomla tutulmuş</option>
                  <option>CIS/noninvaziv yüksek dereceli ürotelyal karsinomla tutulmuş</option>
                  <option>Noninvaziv düşük dereceli ürotelyal karsinom/ürotelyal displaziyle tutulmuş</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sol Üreteral Marj</label>
                <select 
                  value={formData.leftUreteralMargin}
                  onChange={handleSelectChange('leftUreteralMargin')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  <option>Değerlendirilemiyor</option>
                  <option>İnvaziv karsinomla tutulmamış</option>
                  <option>İnvaziv karsinom ve CIS/noinvaziv ürotelyal karsinom tarafından tutulmamış, mesafe belirtin:</option>
                  <option>İnvaziv karsinomla tutulmuş</option>
                  <option>CIS/noninvaziv yüksek dereceli ürotelyal karsinomla tutulmuş</option>
                  <option>Noninvaziv düşük dereceli ürotelyal karsinom/ürotelyal displaziyle tutulmuş</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Üretral Marj</label>
                <select 
                  value={formData.urethralMargin}
                  onChange={handleSelectChange('urethralMargin')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  <option>Değerlendirilemiyor</option>
                  <option>İnvaziv karsinomla tutulmamış</option>
                  <option>İnvaziv karsinom ve CIS/noinvaziv ürotelyal karsinom tarafından tutulmamış, mesafe belirtin:</option>
                  <option>İnvaziv karsinomla tutulmuş</option>
                  <option>CIS/noninvaziv yüksek dereceli ürotelyal karsinomla tutulmuş</option>
                  <option>Noninvaziv düşük dereceli ürotelyal karsinom/ürotelyal displaziyle tutulmuş</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Yumuşak Doku Marjı</label>
                <select 
                  value={formData.softTissueMargin}
                  onChange={handleSelectChange('softTissueMargin')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  <option>Değerlendirilemiyor</option>
                  <option>İnvaziv karsinomla tutulmamış</option>
                  <option>İnvaziv karsinom ve CIS/noinvaziv ürotelyal karsinom tarafından tutulmamış, mesafe belirtin:</option>
                  <option>İnvaziv karsinomla tutulmuş</option>
                  <option>CIS/noninvaziv yüksek dereceli ürotelyal karsinomla tutulmuş</option>
                  <option>Noninvaziv düşük dereceli ürotelyal karsinom/ürotelyal displaziyle tutulmuş</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Diğer Marj(lar)</label>
                <select 
                  value={formData.otherMargin}
                  onChange={handleSelectChange('otherMargin')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  <option>Değerlendirilemiyor</option>
                  <option>İnvaziv karsinomla tutulmamış</option>
                  <option>İnvaziv karsinom ve CIS/noinvaziv ürotelyal karsinom tarafından tutulmamış, mesafe belirtin:</option>
                  <option>İnvaziv karsinomla tutulmuş</option>
                  <option>CIS/noninvaziv yüksek dereceli ürotelyal karsinomla tutulmuş</option>
                  <option>Noninvaziv düşük dereceli ürotelyal karsinom/ürotelyal displaziyle tutulmuş</option>
                </select>
              </div>
            </section>

            {/* Regional Lymph Nodes */}
            <section className="bg-white rounded-xl shadow-md p-6 transition-transform hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Bölgesel Lenf Nodları</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">İncelenen Bölgesel Lenf Nodu Sayısı</label>
                  <input 
                    type="text"
                    value={formData.regionalLymphNodesExamined}
                    onChange={handleTextChange('regionalLymphNodesExamined')}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Etkilenen Lenf Nodu Sayısı</label>
                  <input 
                    type="text"
                    value={formData.lymphNodesInvolved}
                    onChange={handleTextChange('lymphNodesInvolved')}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ekstranodal Yayılım</label>
                  <select 
                    value={formData.extranodalExtension}
                    onChange={handleSelectChange('extranodalExtension')}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seçiniz...</option>
                    <option>Tespit edilmemiş</option>
                    <option>Var</option>
                    <option>Belirlenemiyor</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">En Büyük Metastatik Lezyon Boyutu (mm), Lokalizasyon</label>
                  <input 
                    type="text"
                    value={formData.metastaticDeposit}
                    onChange={handleTextChange('metastaticDeposit')}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">En Büyük Etkilenen Lenf Nodu Boyutu (mm), Lokalizasyon</label>
                  <input 
                    type="text"
                    value={formData.lymphNodeSize}
                    onChange={handleTextChange('lymphNodeSize')}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* Distant Metastasis */}
            <section className="bg-white rounded-xl shadow-md p-6 transition-transform hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Uzak Metastaz</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "Uygulanamaz",
                  "Tespit edilmemiş",
                  "Non-bölgesel lenf nodu(ları) (belirtin):",
                  "Diğer (belirtin):",
                  "Belirlenemiyor:"
                ].map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.distantMetastasis.includes(option)}
                      onChange={handleCheckboxChange('distantMetastasis', option)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Pathologic Stage Classification */}
            <section className="bg-white rounded-xl shadow-md p-6 transition-transform hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Patolojik Evreleme Sınıflandırması (AJCC 8. Baskı)</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">TNM Tanımlayıcılar</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {[
                    "m (çoklu primer tümörler)",
                    "r (tekrarlayan)",
                    "y (tedavi sonrası)"
                  ].map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.tnmDescriptors.includes(option)}
                        onChange={handleCheckboxChange('tnmDescriptors', option)}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Birincil Tümör (pT)</label>
                <select 
                  value={formData.primaryTumor}
                  onChange={handleSelectChange('primaryTumor')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  <option>pT atanmadı (mevcut patolojik bilgiye göre belirlenemez)</option>
                  <option>pT0: Primer tümör kanıtı yok</option>
                  <option>pTa: Non-invaziv papiller karsinoma</option>
                  <option>pTis: Ürotelyal karsinoma in situ: "düz tümör"</option>
                  <option>pT1: Subepitelial bağ dokusuna invaze tümör</option>
                  <option>pT2: Muscularis propia'ya invaze tümör</option>
                  <option>pT2a: Yüzeyel muscularis propia'ya invaze tümör (iç yarım)</option>
                  <option>pT2b: Derin muscularis propia'ya invaze tümör (dış yarım)</option>
                  <option>pT3: Perivesikal yumuşak dokuya invaze tümör</option>
                  <option>pT3a: Mikroskobik olarak perivesikal yumuşak dokuya invaze tümör</option>
                  <option>pT3b: Makroskobik olarak perivesikal yumuşak dokuya invaze tümör (ekstravezikal kitle)</option>
                  <option>pT4: Ekstravezikal tümör doğrudan aşağıdaki yapılara invaze olur: prostat stroması, seminal veziküller, rahim, vajina, pelvis duvarı, karın duvarı</option>
                  <option>pT4a: Ekstravezikal tümör doğrudan prostat stromasına, seminal veziküllere, rahime veya vajinaya invaze olur</option>
                  <option>pT4b: Ekstravezikal tümör pelvis duvarına, karın duvarına invaze olur</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bölgesel Lenf Nodları (pN)</label>
                <select 
                  value={formData.regionalLymphNodes}
                  onChange={handleSelectChange('regionalLymphNodes')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  <option>pN atanmadı (nodlar gönderilmedi veya bulunamadı)</option>
                  <option>pN atanmadı (mevcut bilgiye göre belirlenemez)</option>
                  <option>pN0: Bölgesel lenf nodu metastazı yok</option>
                  <option>pN1: Gerçek pelvis içindeki tek bölgesel lenf nodu metastazı (perivesikal, obturator, internal [hipogastrik] ve external iliak, ya da presakral lenf nodu)</option>
                  <option>pN2: Gerçek pelvis içindeki çoklu bölgesel lenf nodu metastazı (perivesikal, hipogastrik, obturator, internal ve external iliak, ya da presakral lenf nodu)</option>
                  <option>pN3: Ortak iliak lenf nodlarına metastaz</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Uzak Metastaz (pM)</label>
                <select 
                  value={formData.distantMetastasisStage}
                  onChange={handleSelectChange('distantMetastasisStage')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  <option>Uygulanamaz - pM gönderilen örnek(ler)den belirlenemez</option>
                  <option>pM1: Uzak metastaz</option>
                  <option>pM1a: Ortak iliaklardan ötesine uzanan lenf nodu metastazı</option>
                  <option>pM1b: Lenf dışı uzak metastazlar</option>
                </select>
              </div>
            </section>

            {/* Additional Pathological Findings */}
            <section className="bg-white rounded-xl shadow-md p-6 transition-transform hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Ek Patolojik Bulgular</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "Ürotelyal displazi, düşük derece",
                  "Prostat adenokarsinomu (prostat karsinomu için protokol kullanın)",
                  "Keratinize skuamöz metaplazi",
                  "İnflamasyon/regeneratif değişiklikler",
                  "Metaplazi (türünü belirtin):",
                  "Kistitis kistik et glandularis",
                  "İntestinal metaplazi",
                  "Tedaviye bağlı değişiklikler, belirtin:"
                ].map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.additionalFindings.includes(option)}
                      onChange={handleCheckboxChange('additionalFindings', option)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
                <div className="col-span-full mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diğer (belirtin):</label>
                  <input 
                    type="text"
                    value={formData.additionalNotes}
                    onChange={handleTextChange('additionalNotes')}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* Associated Epithelial Lesions */}
            <section className="bg-white rounded-xl shadow-md p-6 transition-transform hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">İlişkili Epitelyal Lezyonlar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "Hiçbiri saptanmadı",
                  "Ürotelyal papilloma",
                  "Ürotelyal papilloma, invert tip",
                  "PUNLMP (Papiller ürotelyal neoplazm, düşük malign potansiyelli)",
                  "Ürotelyal proliferasyon, belirsiz malign potansiyelli",
                  "Ürotelyal displazi",
                  "Değerlendirilemiyor (açıklayın):"
                ].map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.associatedLesions.includes(option)}
                      onChange={handleCheckboxChange('associatedLesions', option)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Additional Notes */}
            <section className="bg-white rounded-xl shadow-md p-6 transition-transform hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Ek Notlar</h2>
              <textarea
                value={formData.additionalNotes}
                onChange={handleTextChange('additionalNotes')}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ek açıklamalar buraya..."
              />
            </section>
          </div>

          {/* Right Report Column */}
          <div className="lg:sticky lg:top-24">
            <section className="bg-white rounded-xl shadow-md p-6 transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Otomatik Oluşturulan Rapor</h2>
                {stage && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Evre: {stage}
                  </span>
                )}
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-[300px] whitespace-pre-wrap font-mono text-sm text-gray-800">
                {report || 'Formda seçim yaparak rapor burada otomatik oluşturulacaktır...'}
              </div>
              
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Raporu Kopyala
                </button>
                <button
                  onClick={() => setFormData({})}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Sıfırla
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>Queen Mary Hastanesi Anatomik Patoloji Bölümü • Son güncelleme: 01-Eyl-2023</p>
          <p className="mt-2">
            US CAP kanser protokol şablonlarına dayanmaktadır.
            <br />
            <a href="https://www.cap.org/protocols-and-guidelines/cancer-reporting-tools/cancer-protocol-templates" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              www.cap.org
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
```
