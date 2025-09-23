import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { ResearchData, CanvasData, AgentData, DebateData, StudyData, StudioData, TripData, HealthData, InterviewData, MarketData, ChefData, GameData } from '../types';

const researchSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A detailed, comprehensive summary of the research topic, written in an academic yet accessible tone. It should be at least 3 paragraphs long."
    },
    sources: {
      type: Type.ARRAY,
      description: "A list of at least 5 credible sources used for the research.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "The title of the source article or page." },
          url: { type: Type.STRING, description: "The full URL of the source." },
          snippet: { type: Type.STRING, description: "A brief snippet or quote from the source that is relevant to the topic." }
        },
        required: ["title", "url", "snippet"]
      }
    },
    flashCards: {
      type: Type.ARRAY,
      description: "A list of 5-10 flashcards with questions and answers to help study the topic.",
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING, description: "A concise question about a key concept." },
          answer: { type: Type.STRING, description: "The corresponding answer to the question." }
        },
        required: ["question", "answer"]
      }
    },
    relatedVideos: {
      type: Type.ARRAY,
      description: "A list of 3-5 related video topics that could be found on platforms like YouTube.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A compelling title for a related video." },
          description: { type: Type.STRING, description: "A brief, one-sentence description of what the video would be about." }
        },
        required: ["title", "description"]
      }
    },
    miniAppData: {
      type: Type.ARRAY,
      description: "A list of 5-7 key terms or concepts from the research and their hypothetical frequency of appearance in relevant literature.",
      items: {
        type: Type.OBJECT,
        properties: {
          keyword: { type: Type.STRING, description: "A key term or concept." },
          frequency: { type: Type.INTEGER, description: "A number between 10 and 100 representing its frequency." }
        },
        required: ["keyword", "frequency"]
      }
    }
  },
  required: ["summary", "sources", "flashCards", "relatedVideos", "miniAppData"]
};

const canvasSchema = {
    type: Type.OBJECT,
    properties: {
        sources: {
            type: Type.ARRAY,
            description: "A list of credible sources used to gather information for the application's content.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "The title of the source article or page." },
                    url: { type: Type.STRING, description: "The full URL of the source." },
                    snippet: { type: Type.STRING, description: "A brief snippet or quote from the source that is relevant to the topic." }
                },
                required: ["title", "url", "snippet"]
            }
        },
        code: {
            type: Type.ARRAY,
            description: "An array of code files, typically index.html, style.css, and script.js, to build the application.",
            items: {
                type: Type.OBJECT,
                properties: {
                    filename: { type: Type.STRING, description: "The name of the file (e.g., 'index.html')." },
                    language: { type: Type.STRING, description: "The programming language (e.g., 'html', 'css', 'javascript')." },
                    content: { type: Type.STRING, description: "The full content of the code file." }
                },
                required: ["filename", "language", "content"]
            }
        }
    },
    required: ["sources", "code"]
};

const agentSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A detailed, comprehensive summary of the research topic, synthesized from the agent's findings."
    },
    sources: {
      type: Type.ARRAY,
      description: "A list of at least 5 credible sources discovered and used by the agent during its research process.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "The title of the source article or page." },
          url: { type: Type.STRING, description: "The full URL of the source." },
          snippet: { type: Type.STRING, description: "A brief snippet or quote from the source that is relevant to the topic." }
        },
        required: ["title", "url", "snippet"]
      }
    },
    agentPath: {
      type: Type.ARRAY,
      description: "A step-by-step log of the agent's research process and reasoning. This should detail the path it took to arrive at the summary.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A short title for the research step (e.g., 'Initial Brainstorming', 'Verifying a Claim')." },
          reasoning: { type: Type.STRING, description: "The agent's reasoning or thought process for this step." },
          sourceURL: { type: Type.STRING, description: "If this step involved consulting a specific source, its URL." }
        },
        required: ["title", "reasoning"]
      }
    }
  },
  required: ["summary", "sources", "agentPath"]
};

const debateSchema = {
    type: Type.OBJECT,
    properties: {
        topic: {
            type: Type.STRING,
            description: "The main topic of the debate, restated clearly."
        },
        viewpoints: {
            type: Type.ARRAY,
            description: "An array of 2-3 distinct viewpoints on the topic.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "The name of the viewpoint (e.g., 'Pro Position', 'Against Position')." },
                    summary: { type: Type.STRING, description: "A neutral, comprehensive summary of this viewpoint." },
                    arguments: {
                        type: Type.ARRAY,
                        description: "A list of key arguments supporting this viewpoint.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                claim: { type: Type.STRING, description: "The central claim of the argument." },
                                evidence: { type: Type.STRING, description: "Evidence, data, or reasoning supporting the claim." },
                                counterArgument: { type: Type.STRING, description: "A common counter-argument or rebuttal to this claim." }
                            },
                            required: ["claim", "evidence", "counterArgument"]
                        }
                    }
                },
                required: ["title", "summary", "arguments"]
            }
        },
        pointsOfConsensus: {
            type: Type.STRING,
            description: "A paragraph summarizing any points where the different viewpoints tend to agree or share common ground."
        },
        unresolvedQuestions: {
            type: Type.ARRAY,
            description: "A list of 3-5 key questions that remain central to the debate and are not fully resolved.",
            items: { type: Type.STRING }
        },
        sources: {
            type: Type.ARRAY,
            description: "A list of at least 5 credible sources used for the research.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "The title of the source article or page." },
                    url: { type: Type.STRING, description: "The full URL of the source." },
                    snippet: { type: Type.STRING, description: "A brief snippet or quote from the source that is relevant to the topic." }
                },
                required: ["title", "url", "snippet"]
            }
        }
    },
    required: ["topic", "viewpoints", "pointsOfConsensus", "unresolvedQuestions", "sources"]
};

const studySchema = {
    type: Type.OBJECT,
    properties: {
        keyConcepts: {
            type: Type.ARRAY,
            description: "A list of 5-7 fundamental concepts crucial for understanding the topic.",
            items: {
                type: Type.OBJECT,
                properties: {
                    concept: { type: Type.STRING, description: "The name of the key concept." },
                    definition: { type: Type.STRING, description: "A clear and concise definition of the concept." },
                    example: { type: Type.STRING, description: "A simple, easy-to-understand example illustrating the concept." }
                },
                required: ["concept", "definition", "example"]
            }
        },
        studyPlan: {
            type: Type.ARRAY,
            description: "A structured, week-by-week or day-by-day study plan to master the topic.",
            items: {
                type: Type.OBJECT,
                properties: {
                    timeframe: { type: Type.STRING, description: "The timeframe for this part of the plan (e.g., 'Week 1', 'Days 1-3')." },
                    topics: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of specific topics to cover in this timeframe." },
                    activities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of suggested learning activities (e.g., 'Read chapter 5', 'Watch a documentary')." }
                },
                required: ["timeframe", "topics", "activities"]
            }
        },
        practiceProblems: {
            type: Type.ARRAY,
            description: "A set of 5-8 practice problems or questions to test understanding, with detailed answers.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "A practice question." },
                    answer: { type: Type.STRING, description: "The detailed solution or answer to the question." }
                },
                required: ["question", "answer"]
            }
        },
        analogies: {
            type: Type.ARRAY,
            description: "A list of 3-5 simple analogies to explain the most complex aspects of the topic.",
            items: {
                type: Type.OBJECT,
                properties: {
                    concept: { type: Type.STRING, description: "The complex concept being explained." },
                    analogy: { type: Type.STRING, description: "The simple analogy." }
                },
                required: ["concept", "analogy"]
            }
        },
        sources: {
            type: Type.ARRAY,
            description: "A list of credible sources used to create the study guide.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "The title of the source." },
                    url: { type: Type.STRING, description: "The URL of the source." },
                    snippet: { type: Type.STRING, description: "A relevant snippet from the source." }
                },
                required: ["title", "url", "snippet"]
            }
        }
    },
    required: ["keyConcepts", "studyPlan", "practiceProblems", "analogies", "sources"]
};

const studioSchema = {
    type: Type.OBJECT,
    properties: {
        topic: {
            type: Type.STRING,
            description: "The main topic for the content, restated clearly."
        },
        videoIdeas: {
            type: Type.ARRAY,
            description: "A list of 3-5 engaging video ideas suitable for platforms like YouTube or TikTok.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "A catchy, clickable title for the video." },
                    hook: { type: Type.STRING, description: "A 1-2 sentence hook to grab the viewer's attention in the first 3 seconds." },
                    description: { type: Type.STRING, description: "A brief summary of the video concept." }
                },
                required: ["title", "hook", "description"]
            }
        },
        script: {
            type: Type.ARRAY,
            description: "A detailed script for the most promising video idea, broken down into scenes or segments.",
            items: {
                type: Type.OBJECT,
                properties: {
                    scene: { type: Type.STRING, description: "The name of the scene or segment (e.g., 'Intro', 'Main Point 1', 'Outro')." },
                    dialogue: { type: Type.STRING, description: "The spoken dialogue or voiceover for this segment." },
                    visuals: { type: Type.STRING, description: "Suggestions for on-screen visuals, B-roll, text overlays, or actions." }
                },
                required: ["scene", "dialogue", "visuals"]
            }
        },
        seoKeywords: {
            type: Type.ARRAY,
            description: "A list of 5-10 relevant SEO keywords to improve video discoverability.",
            items: { type: Type.STRING }
        },
        hashtags: {
            type: Type.ARRAY,
            description: "A list of 5-10 relevant hashtags for social media platforms.",
            items: { type: Type.STRING }
        },
        sources: {
            type: Type.ARRAY,
            description: "A list of credible sources used for content research.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "The title of the source." },
                    url: { type: Type.STRING, description: "The URL of the source." },
                    snippet: { type: Type.STRING, description: "A relevant snippet from the source." }
                },
                required: ["title", "url", "snippet"]
            }
        }
    },
    required: ["topic", "videoIdeas", "script", "seoKeywords", "hashtags", "sources"]
};

const tripSchema = {
    type: Type.OBJECT,
    properties: {
        destination: { type: Type.STRING, description: "The primary destination of the trip." },
        tripSummary: { type: Type.STRING, description: "A brief, enticing summary of the planned trip." },
        itinerary: {
            type: Type.ARRAY,
            description: "A detailed day-by-day itinerary.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.STRING, description: "The day of the trip (e.g., 'Day 1')." },
                    title: { type: Type.STRING, description: "A title for the day's activities (e.g., 'Arrival and Exploration')." },
                    activities: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                time: { type: Type.STRING, description: "Time of day (e.g., 'Morning', '9:00 AM')." },
                                description: { type: Type.STRING, description: "Description of the activity." }
                            },
                            required: ["time", "description"]
                        }
                    }
                },
                required: ["day", "title", "activities"]
            }
        },
        packingList: {
            type: Type.ARRAY,
            description: "A list of recommended items to pack.",
            items: { type: Type.STRING }
        },
        budgetBreakdown: {
            type: Type.ARRAY,
            description: "An estimated budget breakdown for the trip.",
            items: {
                type: Type.OBJECT,
                properties: {
                    category: { type: Type.STRING, description: "Budget category (e.g., 'Flights', 'Accommodation')." },
                    cost: { type: Type.STRING, description: "Estimated cost or range." }
                },
                required: ["category", "cost"]
            }
        },
        sources: {
            type: Type.ARRAY,
            description: "A list of credible sources used for planning.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "Title of the source." },
                    url: { type: Type.STRING, description: "URL of the source." },
                    snippet: { type: Type.STRING, description: "A relevant snippet." }
                },
                required: ["title", "url", "snippet"]
            }
        }
    },
    required: ["destination", "tripSummary", "itinerary", "packingList", "budgetBreakdown", "sources"]
};

const healthSchema = {
    type: Type.OBJECT,
    properties: {
        goal: { type: Type.STRING, description: "The primary health and fitness goal this plan is designed for." },
        disclaimer: { type: Type.STRING, description: "A mandatory, clear disclaimer stating that this plan is not medical advice and a doctor should be consulted before starting." },
        workoutPlan: {
            type: Type.ARRAY,
            description: "A structured workout plan.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.STRING, description: "The day or focus of the workout (e.g., 'Monday - Upper Body')." },
                    exercises: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING, description: "Name of the exercise." },
                                sets: { type: Type.STRING, description: "Number of sets." },
                                reps: { type: Type.STRING, description: "Number of repetitions." }
                            },
                            required: ["name", "sets", "reps"]
                        }
                    }
                },
                required: ["day", "exercises"]
            }
        },
        mealPlan: {
            type: Type.ARRAY,
            description: "A sample meal plan for a few days.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.STRING, description: "The day for the meal plan (e.g., 'Day 1')." },
                    meals: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING, description: "Meal name (e.g., 'Breakfast', 'Lunch')." },
                                description: { type: Type.STRING, description: "Description of the meal." }
                            },
                            required: ["name", "description"]
                        }
                    }
                },
                required: ["day", "meals"]
            }
        },
        healthyHabits: {
            type: Type.ARRAY,
            description: "A list of actionable tips for healthy habits.",
            items: { type: Type.STRING }
        },
        sources: {
            type: Type.ARRAY,
            description: "A list of credible sources used for information.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "Title of the source." },
                    url: { type: Type.STRING, description: "URL of the source." },
                    snippet: { type: Type.STRING, description: "A relevant snippet." }
                },
                required: ["title", "url", "snippet"]
            }
        }
    },
    required: ["goal", "disclaimer", "workoutPlan", "mealPlan", "healthyHabits", "sources"]
};

const interviewSchema = {
    type: Type.OBJECT,
    properties: {
        jobRole: { type: Type.STRING, description: "The job role for which the interview preparation is generated." },
        introduction: { type: Type.STRING, description: "A brief, encouraging introduction for the user preparing for the interview." },
        commonQuestions: {
            type: Type.ARRAY,
            description: "A list of 3-5 common, non-technical interview questions.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The interview question." },
                    sampleAnswer: { type: Type.STRING, description: "A detailed, high-quality sample answer." },
                    tips: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Actionable tips for answering this question." }
                },
                required: ["question", "sampleAnswer", "tips"]
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            description: "A list of 3-5 behavioral questions, often using the STAR method.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The behavioral question." },
                    sampleAnswer: { type: Type.STRING, description: "A sample answer using the STAR (Situation, Task, Action, Result) format." },
                    tips: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Tips on how to structure the response." }
                },
                required: ["question", "sampleAnswer", "tips"]
            }
        },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "A list of 3-5 technical questions relevant to the job role. If the role is non-technical, this can be an empty array.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The technical question." },
                    sampleAnswer: { type: Type.STRING, description: "A correct and well-explained sample answer." },
                    tips: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Tips for tackling this type of technical question." }
                },
                required: ["question", "sampleAnswer", "tips"]
            }
        },
        closingStatement: { type: Type.STRING, description: "Advice on how to ask good questions and end the interview on a positive note." },
        sources: {
            type: Type.ARRAY,
            description: "A list of credible sources used for information.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "Title of the source." },
                    url: { type: Type.STRING, description: "URL of the source." },
                    snippet: { type: Type.STRING, description: "A relevant snippet." }
                },
                required: ["title", "url", "snippet"]
            }
        }
    },
    required: ["jobRole", "introduction", "commonQuestions", "behavioralQuestions", "technicalQuestions", "closingStatement", "sources"]
};

const marketSchema = {
    type: Type.OBJECT,
    properties: {
        productIdea: { type: Type.STRING, description: "The product or business idea being analyzed." },
        summary: { type: Type.STRING, description: "A high-level executive summary of the market analysis." },
        targetAudience: {
            type: Type.ARRAY,
            description: "A breakdown of the primary target audience segments.",
            items: {
                type: Type.OBJECT,
                properties: {
                    segment: { type: Type.STRING, description: "The name of the audience segment (e.g., 'Young Professionals')." },
                    description: { type: Type.STRING, description: "A detailed description of this segment's demographics, needs, and behaviors." }
                },
                required: ["segment", "description"]
            }
        },
        competitors: {
            type: Type.ARRAY,
            description: "An analysis of 2-4 key competitors.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "The name of the competitor." },
                    strengths: { type: Type.STRING, description: "The key strengths of this competitor." },
                    weaknesses: { type: Type.STRING, description: "The key weaknesses or gaps in their offering." }
                },
                required: ["name", "strengths", "weaknesses"]
            }
        },
        swotAnalysis: {
            type: Type.OBJECT,
            description: "A SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis for the product idea.",
            properties: {
                strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Internal strengths of the product/business." },
                weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Internal weaknesses of the product/business." },
                opportunities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "External market opportunities to capitalize on." },
                threats: { type: Type.ARRAY, items: { type: Type.STRING }, description: "External market threats to be aware of." }
            },
            required: ["strengths", "weaknesses", "opportunities", "threats"]
        },
        marketingStrategies: {
            type: Type.ARRAY,
            description: "A list of 5-7 actionable marketing strategies.",
            items: { type: Type.STRING }
        },
        sources: {
            type: Type.ARRAY,
            description: "A list of credible sources used for information.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "Title of the source." },
                    url: { type: Type.STRING, description: "URL of the source." },
                    snippet: { type: Type.STRING, description: "A relevant snippet." }
                },
                required: ["title", "url", "snippet"]
            }
        }
    },
    required: ["productIdea", "summary", "targetAudience", "competitors", "swotAnalysis", "marketingStrategies", "sources"]
};

const chefSchema = {
    type: Type.OBJECT,
    properties: {
        recipeName: { type: Type.STRING, description: "The name of the recipe." },
        description: { type: Type.STRING, description: "A short, enticing description of the dish." },
        prepTime: { type: Type.STRING, description: "Estimated preparation time (e.g., '15 minutes')." },
        cookTime: { type: Type.STRING, description: "Estimated cooking time (e.g., '30 minutes')." },
        difficulty: { type: Type.STRING, description: "Difficulty level, must be one of: 'Easy', 'Medium', 'Hard'." },
        ingredients: {
            type: Type.ARRAY,
            description: "A list of all ingredients required for the recipe.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Name of the ingredient." },
                    quantity: { type: Type.STRING, description: "Quantity and unit (e.g., '2 cups', '1 tbsp')." }
                },
                required: ["name", "quantity"]
            }
        },
        instructions: {
            type: Type.ARRAY,
            description: "A list of step-by-step instructions for preparing the dish.",
            items: { type: Type.STRING }
        },
        sources: {
            type: Type.ARRAY,
            description: "A list of sources for the recipe or cooking techniques.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "Title of the source." },
                    url: { type: Type.STRING, description: "URL of the source." },
                    snippet: { type: Type.STRING, description: "A relevant snippet." }
                },
                required: ["title", "url", "snippet"]
            }
        }
    },
    required: ["recipeName", "description", "prepTime", "cookTime", "difficulty", "ingredients", "instructions", "sources"]
};

const gameSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A catchy and creative title for the game." },
        concept: { type: Type.STRING, description: "A high-level concept or 'elevator pitch' for the game, summarizing its theme and what makes it unique." },
        coreMechanics: {
            type: Type.ARRAY,
            description: "A list of 3-5 core gameplay mechanics.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "The name of the mechanic (e.g., 'Crafting System', 'Dynamic Dialogue')." },
                    description: { type: Type.STRING, description: "A detailed explanation of how the mechanic works." }
                },
                required: ["name", "description"]
            }
        },
        characterConcepts: {
            type: Type.ARRAY,
            description: "A list of 2-3 interesting character concepts, which could be player characters or NPCs.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "The character's name or title." },
                    description: { type: Type.STRING, description: "A brief backstory and personality description." },
                    abilities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of key skills or abilities." }
                },
                required: ["name", "description", "abilities"]
            }
        },
        monetization: {
            type: Type.ARRAY,
            description: "A list of potential monetization strategies (e.g., 'Premium Purchase', 'Cosmetic Microtransactions').",
            items: { type: Type.STRING }
        },
        sources: {
            type: Type.ARRAY,
            description: "A list of sources for game design inspiration or market data.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "Title of the source." },
                    url: { type: Type.STRING, description: "URL of the source." },
                    snippet: { type: Type.STRING, description: "A relevant snippet." }
                },
                required: ["title", "url", "snippet"]
            }
        }
    },
    required: ["title", "concept", "coreMechanics", "characterConcepts", "monetization", "sources"]
};

export class GeminiService {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("API key is required to initialize GeminiService.");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  async performDeepResearch(query: string): Promise<ResearchData> {
    console.log(`Performing deep research for: ${query}`);
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Perform a deep research analysis on the following topic: "${query}". Provide a comprehensive summary, credible sources, study flashcards, ideas for related videos, and data for a mini-app visualization.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: researchSchema,
        },
      });

      const jsonText = response.text.trim();
      const parsedData = JSON.parse(jsonText);
      
      if (!parsedData.summary || !parsedData.sources || !parsedData.flashCards) {
          throw new Error("Received incomplete data from the API.");
      }

      return parsedData as ResearchData;
    } catch (error) {
      console.error("Error in performDeepResearch:", error);
      throw new Error("Failed to fetch or parse research data from the Gemini API.");
    }
  }

  async performAgentResearch(query: string): Promise<AgentData> {
    console.log(`Performing agent research for: ${query}`);
    try {
        const response = await this.ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Act as an autonomous research agent. Your goal is to conduct a deep investigation into the topic: "${query}". You must document your step-by-step process, including your reasoning at each stage. Formulate a plan, find sources, synthesize information, and produce a final summary. Your entire process and findings must be returned in the specified JSON format.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: agentSchema,
            },
        });

        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);

        if (!parsedData.summary || !parsedData.sources || !parsedData.agentPath) {
            throw new Error("Received incomplete agent data from the API.");
        }

        return parsedData as AgentData;
    } catch (error) {
        console.error("Error in performAgentResearch:", error);
        throw new Error("Failed to fetch or parse agent research data from the Gemini API.");
    }
  }

  async performCanvasGeneration(query: string): Promise<CanvasData> {
    console.log(`Performing canvas generation for: ${query}`);
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are a web developer AI. Your task is to build a single-page application based on a user's request. You must provide the complete HTML, CSS, and JavaScript code for the application. Also, list any sources you used to gather information for the content of the app. Make sure the app is visually appealing.
        
        Request: "${query}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: canvasSchema,
        },
      });

      const jsonText = response.text.trim();
      const parsedData = JSON.parse(jsonText);
      
      if (!parsedData.code || !parsedData.sources) {
          throw new Error("Received incomplete data from the API for canvas generation.");
      }

      return parsedData as CanvasData;
    } catch (error) {
      console.error("Error in performCanvasGeneration:", error);
      throw new Error("Failed to fetch or parse canvas data from the Gemini API.");
    }
  }

  async performDeepDebate(query: string): Promise<DebateData> {
    console.log(`Performing deep debate for: ${query}`);
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Act as an unbiased moderator and researcher. Your goal is to conduct a deep analysis of the debate topic: "${query}". 
        
        You must:
        1. Identify the primary, distinct viewpoints in this debate.
        2. For each viewpoint, summarize its core position.
        3. For each viewpoint, present its strongest arguments, including the claim, supporting evidence, and a common counter-argument.
        4. Identify any points of consensus or common ground between the viewpoints.
        5. List the key unresolved questions that are central to the ongoing debate.
        6. Provide a list of credible sources you consulted.

        Return the entire analysis in the specified JSON format.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: debateSchema,
        },
      });

      const jsonText = response.text.trim();
      const parsedData = JSON.parse(jsonText);

      if (!parsedData.topic || !parsedData.viewpoints || !parsedData.sources) {
          throw new Error("Received incomplete debate data from the API.");
      }

      return parsedData as DebateData;
    } catch (error) {
      console.error("Error in performDeepDebate:", error);
      throw new Error("Failed to fetch or parse debate data from the Gemini API.");
    }
  }

  async performDeepStudy(query: string): Promise<StudyData> {
      console.log(`Performing deep study for: ${query}`);
      try {
          const response = await this.ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: `Act as an expert tutor and instructional designer. Your goal is to create a comprehensive, engaging, and effective study guide for the topic: "${query}". 
        
              You must provide:
              1. Key Concepts: The most important foundational ideas.
              2. Study Plan: A structured plan to guide the learner.
              3. Practice Problems: Questions to test knowledge and application.
              4. Analogies: Simple ways to understand complex parts.
              5. Sources: Credible references for further reading.

              Return the entire study guide in the specified JSON format.`,
              config: {
                  responseMimeType: "application/json",
                  responseSchema: studySchema,
              },
          });

          const jsonText = response.text.trim();
          const parsedData = JSON.parse(jsonText);

          if (!parsedData.keyConcepts || !parsedData.studyPlan || !parsedData.sources) {
              throw new Error("Received incomplete study data from the API.");
          }

          return parsedData as StudyData;
      } catch (error) {
          console.error("Error in performDeepStudy:", error);
          throw new Error("Failed to fetch or parse study guide data from the Gemini API.");
      }
  }

  async performDeepStudio(query: string): Promise<StudioData> {
      console.log(`Performing deep studio for: ${query}`);
      try {
          const response = await this.ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: `Act as a creative strategist for a content creator on platforms like YouTube and TikTok. Your goal is to develop a complete content package for the topic: "${query}". You must generate engaging video ideas, a detailed script for one of them, SEO keywords, relevant hashtags, and cite your sources. Return the entire package in the specified JSON format.`,
              config: {
                  responseMimeType: "application/json",
                  responseSchema: studioSchema,
              },
          });

          const jsonText = response.text.trim();
          const parsedData = JSON.parse(jsonText);

          if (!parsedData.videoIdeas || !parsedData.script || !parsedData.sources) {
              throw new Error("Received incomplete studio data from the API.");
          }

          return parsedData as StudioData;
      } catch (error) {
          console.error("Error in performDeepStudio:", error);
          throw new Error("Failed to fetch or parse studio data from the Gemini API.");
      }
  }

  async performDeepTrip(query: string): Promise<TripData> {
      console.log(`Performing deep trip for: ${query}`);
      try {
          const response = await this.ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: `Act as an expert travel agent. Your goal is to create a comprehensive and inspiring travel plan based on the user's request: "${query}". You must provide a trip summary, a detailed day-by-day itinerary, a practical packing list, a budget breakdown, and credible sources. Return the entire plan in the specified JSON format.`,
              config: {
                  responseMimeType: "application/json",
                  responseSchema: tripSchema,
              },
          });

          const jsonText = response.text.trim();
          const parsedData = JSON.parse(jsonText);

          if (!parsedData.itinerary || !parsedData.packingList || !parsedData.sources) {
              throw new Error("Received incomplete trip data from the API.");
          }

          return parsedData as TripData;
      } catch (error) {
          console.error("Error in performDeepTrip:", error);
          throw new Error("Failed to fetch or parse trip data from the Gemini API.");
      }
  }

  async performDeepHealth(query: string): Promise<HealthData> {
      console.log(`Performing deep health for: ${query}`);
      try {
          const response = await this.ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: `Act as a wellness planner. Create a personalized health and fitness plan based on the user's goal: "${query}". You MUST include a clear disclaimer that this is not medical advice and a doctor should be consulted. Also provide a workout plan, a sample meal plan, healthy habit tips, and credible sources. Return the entire plan in the specified JSON format.`,
              config: {
                  responseMimeType: "application/json",
                  responseSchema: healthSchema,
              },
          });

          const jsonText = response.text.trim();
          const parsedData = JSON.parse(jsonText);

          if (!parsedData.disclaimer || !parsedData.workoutPlan || !parsedData.mealPlan) {
              throw new Error("Received incomplete health data from the API.");
          }

          return parsedData as HealthData;
      } catch (error) {
          console.error("Error in performDeepHealth:", error);
          throw new Error("Failed to fetch or parse health data from the Gemini API.");
      }
  }

  async performDeepInterview(query: string): Promise<InterviewData> {
      console.log(`Performing deep interview for: ${query}`);
      try {
          const response = await this.ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: `Act as an expert interview coach and career advisor. Your goal is to create a comprehensive, encouraging, and actionable interview preparation guide for the job role: "${query}". Provide common, behavioral, and technical questions with high-quality sample answers and tips. Also, give advice for closing the interview strongly. Return the entire guide in the specified JSON format.`,
              config: {
                  responseMimeType: "application/json",
                  responseSchema: interviewSchema,
              },
          });

          const jsonText = response.text.trim();
          const parsedData = JSON.parse(jsonText);

          if (!parsedData.jobRole || !parsedData.commonQuestions || !parsedData.sources) {
              throw new Error("Received incomplete interview data from the API.");
          }

          return parsedData as InterviewData;
      } catch (error) {
          console.error("Error in performDeepInterview:", error);
          throw new Error("Failed to fetch or parse interview data from the Gemini API.");
      }
  }

  async performDeepMarket(query: string): Promise<MarketData> {
      console.log(`Performing deep market for: ${query}`);
      try {
          const response = await this.ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: `Act as a senior market analyst and business strategist. Your goal is to conduct a detailed and insightful market analysis for the product or business idea: "${query}". Provide a summary, target audience breakdown, competitor analysis, a full SWOT analysis, and actionable marketing strategies. Return the entire analysis in the specified JSON format.`,
              config: {
                  responseMimeType: "application/json",
                  responseSchema: marketSchema,
              },
          });

          const jsonText = response.text.trim();
          const parsedData = JSON.parse(jsonText);

          if (!parsedData.productIdea || !parsedData.swotAnalysis || !parsedData.sources) {
              throw new Error("Received incomplete market data from the API.");
          }

          return parsedData as MarketData;
      } catch (error) {
          console.error("Error in performDeepMarket:", error);
          throw new Error("Failed to fetch or parse market data from the Gemini API.");
      }
  }

  async performDeepChef(query: string): Promise<ChefData> {
      console.log(`Performing deep chef for: ${query}`);
      try {
          const response = await this.ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: `Act as an expert chef. Your goal is to create a delicious and easy-to-follow recipe based on the user's request: "${query}". Provide a recipe name, description, timings, difficulty, a complete ingredient list, and step-by-step instructions. Also include sources for your recipe. Return the entire recipe in the specified JSON format.`,
              config: {
                  responseMimeType: "application/json",
                  responseSchema: chefSchema,
              },
          });

          const jsonText = response.text.trim();
          const parsedData = JSON.parse(jsonText);

          if (!parsedData.recipeName || !parsedData.ingredients || !parsedData.instructions) {
              throw new Error("Received incomplete recipe data from the API.");
          }

          return parsedData as ChefData;
      } catch (error) {
          console.error("Error in performDeepChef:", error);
          throw new Error("Failed to fetch or parse recipe data from the Gemini API.");
      }
  }

  async performDeepGame(query: string): Promise<GameData> {
      console.log(`Performing deep game for: ${query}`);
      try {
          const response = await this.ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: `Act as an expert game designer. Your goal is to brainstorm a compelling game concept based on the user's idea: "${query}". Develop a game title, a core concept, key gameplay mechanics, interesting character concepts, and potential monetization strategies. Also include sources for inspiration. Return the entire game concept in the specified JSON format.`,
              config: {
                  responseMimeType: "application/json",
                  responseSchema: gameSchema,
              },
          });

          const jsonText = response.text.trim();
          const parsedData = JSON.parse(jsonText);

          if (!parsedData.title || !parsedData.coreMechanics || !parsedData.characterConcepts) {
              throw new Error("Received incomplete game data from the API.");
          }

          return parsedData as GameData;
      } catch (error) {
          console.error("Error in performDeepGame:", error);
          throw new Error("Failed to fetch or parse game data from the Gemini API.");
      }
  }

  createChat(query: string): Chat {
    return this.ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are a helpful research assistant. The user has just completed deep research on the topic: "${query}". Your role is to answer follow-up questions concisely and accurately based on general knowledge related to this topic.`,
      },
    });
  }
}
