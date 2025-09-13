import { NextFunction, Request, Response } from "express";
import en from "../i18n/en.json";
import es from "../i18n/es.json";
import pt from "../i18n/pt.json";

let lang = "";

export const translate = (chave: string): string => {
  console.log(chave, "chave translate", lang);
  if (lang) {
    let language: any = null;

    switch (lang) {
      case "pt-BR":
        language = pt;
        break;
      case "en-US":
        language = en;
        break;
      case "es-ES":
        language = es;
        break;
      default:
        language = pt;
        break;
    }
    //console.log(language[chave], language, chave, "aki judas");
    if (language["" + chave]) {
      return (
        language["" + chave][0] + language["" + chave].substr(1)
        // language["" + chave][0].toUpperCase() + language["" + chave].substr(1)
      );
    } else if (chave.includes(".")) {
      return language[chave.split(".")[0]][chave.split(".")[1]];
    } else {
      return `[${chave}]`;
    }
  } else {
    return `[${chave}]`;
  }
};

export const languageMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  console.log("language middleware");
  const langParam: string | any = req.query.lang;
  if (langParam) {
    lang = langParam.replace("_", "-");
  } else {
    lang = "pt-BR";
  }

  next();
};
