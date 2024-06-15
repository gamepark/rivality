/** @jsxImportSource @emotion/react */
import { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { ReactChild } from 'react'

export function typo(language:string, txt:string) : string {
  if (language==='fr'){
    // non-break space before ':'
    return txt.replaceAll(':','\u00A0:')
  } else {
    return txt
  }
}

export function tr(t:TFunction, language:string, tag:string) : string {
  return typo(language, t(tag))
}

export function tr2(t:TFunction, language:string, tag:string, suffix:string) : string {
  return typo(language, t(tag)+suffix)
}

export const GPTransInner = ({ txt, children }: { txt:string, children:ReactChild[] }) => {
  const regexp=/<([0-9]+)\/>/
  const txts=txt.split(regexp)
  const res:string|ReactChild[]=[]
  for (let i=0; i<txts.length; i++){
    if (i % 2 === 0){
      // Text
      res.push(txts[i])
    } else {
      // Child
      const index=parseInt(txts[i])
      if (index>=0 && index<children.length){
        res.push(children[index])
      }
    }
  }
  return <>{res}</>
}

export const GPTrans = ({ children, defaults, suffix }: { children?:ReactChild[], defaults:string, suffix?:string }) => {
  const { i18n, t } = useTranslation()
  const lang=i18n.language

  let txt=tr2(t, lang, defaults, suffix===undefined ? "" : suffix)
  if (children===undefined)
    return <>{txt}</>
  return <GPTransInner txt={txt} children={children}></GPTransInner>
}
