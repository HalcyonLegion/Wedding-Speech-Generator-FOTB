import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const { tone, name, groom, bride, event1, event2, childhood, qualities, habits, tip, story, feeling123 } = req.body;

  // if (!tone || !name || !groom || !bride|| !event1 || !event2 || !childhood|| !qualities || !habits || !tip || !story || !feeling123) {
  //   res.status(400).json({
  //     error: {
  //       message: "Please enter all required inputs",
  //     }
  //   });
  //   return;
  // }

  try {
    const completion = await openai.createCompletion({
      model:"text-davinci-003",
      prompt: generatePrompt(tone, name, groom, bride, event1, event2, childhood, qualities, habits, tip, story, feeling123),
      temperature: 0.8,
      max_tokens: 1500,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(tone, name, groom, bride, event1, event2, childhood, qualities, habits, tip, story, feeling123) {
  return `
  tone: ${tone}
  name: ${name}
  bride: ${bride}
  groom: ${groom}
  event1: ${event1}
  event2: ${event2}
  childhood: ${childhood}
  qualities: ${qualities}
  habits: ${habits}
  tip: ${tip}
  story: ${story}
  feeling123: ${feeling123}

  Using British English, write out a complete and detailed, <<TONE>> Wedding Speech to be given by the Father of the Bride, whose name is <<NAME>>. The Bride's name is <<BRIDE>> and the Groom's name is <<GROOM>>. <<NAME>> will talk about <<EVENT>> and on a much more personal note about <<EVENT2>>. The Speech must go into great detail about her childhood: <<CHILDHOOD>>. <<NAME>> will talk about <<BRIDE>>'s qualities: <<QUALITIES>>, as well as her worst habits: <<HABITS>>. <<NAME>> will talk about how he feels about <<GROOM>> and offer him this tip when it comes to looking after his Daughter: <<TIP>>. <<NAME>> will share this story about when he first met <<GROOM>>: <<STORY>> which includes these Three feelings about his appearance "I thought he was <<FEELING123>>". <<NAME>> will end the speech with a heartfelt thanks to all who could attend, and a toast to the newly married couple ending with "Cheers!". Write out the entire Speech in great detail and be as <<TONE>> throughout:

  `;
}