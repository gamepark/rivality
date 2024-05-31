/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const RemoveGolemHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.remove.golem')}</>
}
