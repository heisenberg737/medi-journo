import { HfInference } from '@huggingface/inference';
import { fetchHFAPIKey } from '../components/db.service';

const hfApiKey = await fetchHFAPIKey()

// const hf = new HfInference('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'); // Replace with your actual API key
const hf = new HfInference(hfApiKey)

export const extractEntities = async (text: string) => {
  const response = await hf.tokenClassification({
        inputs: text,
        model: 'dbmdz/bert-large-cased-finetuned-conll03-english', // Example NER model
      });

      const sortedEntities = response.sort((a: any, b: any) => b.score - a.score);

      const uniqueEntities = new Map<string, any>();
    sortedEntities.forEach((entity: any) => {
        const entityText = entity.word.toLowerCase();
        if (entity.score > 0.5 && !uniqueEntities.has(entityText)) {
            uniqueEntities.set(entityText, entity);
        }
    });

    const bestTags = Array.from(uniqueEntities.values()).map((entity) => entity.word);
    
      // const tags = response.entities.map(entity => entity.label);
      // return tags;
      return bestTags;
};