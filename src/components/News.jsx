import { useTranslation } from 'react-i18next';

const NewsComp = () => {
  const { t, i18n } = useTranslation('translation');

  const toggleLanguage = () => {
    const currentLanguage = i18n.language;
    i18n.changeLanguage(currentLanguage === 'en' ? 'kr' : 'en');
  };

  return (
    <div>
      News : {t('news.empty')}
      <button onClick={toggleLanguage}>
        {i18n.language === 'en' ? '한국어로 변경' : 'Switch to English'}
      </button>
    </div>
  );
};

export default NewsComp;
