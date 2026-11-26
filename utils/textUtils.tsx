import { Fragment, type ReactNode } from 'react';

/**
 * Converte un testo con **grassetti** e \n in nodi React.
 * I segmenti tra ** vengono avvolti in <strong>, le newline in <br />.
 * Utile per i testi dei dizionari, che sono stringhe semplici.
 *
 * @param text - Testo da convertire; i `**` devono essere bilanciati.
 * @returns Un array di nodi React da inserire direttamente nel JSX.
 * @example
 * <h1>{formatText('Ciao, sono **Matteo**\nsviluppatore')}</h1>
 */
export default function formatText(text: string): ReactNode[] {
  return text.split(/(\*\*.*?\*\*)/).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    const lines = part.split('\n');
    return (
      <Fragment key={index}>
        {lines.map((line, lineIndex) => (
          <Fragment key={lineIndex}>
            {line}
            {lineIndex < lines.length - 1 && <br />}
          </Fragment>
        ))}
      </Fragment>
    );
  });
}
