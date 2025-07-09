import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";

// Type definitions for a quiz pair
interface WordPair {
  word: string;
  wordInSentence?: string;
  meaning: string;
  sentence: string;
  blankedSentence: string;
  sentenceExplanationCorrect: string;
  sentenceExplanationWrong: string;
}

interface QuizPair {
  pair: [WordPair, WordPair];
}

interface CommonConfusionsQuizProps {
  data: QuizPair[];
  onComplete: (isCorrect: boolean) => void;
}

// Utility to shuffle an array in-place
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const CommonConfusionsQuiz: React.FC<CommonConfusionsQuizProps> = ({ data, onComplete }) => {
  // Shuffle order of questions
  const [questionOrder] = useState(() => {
    const arr = [...Array(data.length).keys()];
    shuffleArray(arr);
    return arr;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stage, setStage] = useState<'meaning' | 'sentence'>('meaning');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [disableOptions, setDisableOptions] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // For each question, randomize which word is target
  const [meaningTargetIdx] = useState(() => data.map(() => Math.floor(Math.random() * 2)));
  const [sentenceTargetIdx] = useState(() => data.map(() => Math.floor(Math.random() * 2)));

  // Add state to cache the shuffled sentence options order per question
  const [sentenceOptionsOrder, setSentenceOptionsOrder] = useState<{ [key: number]: { word: string; isCorrect: boolean }[] }>({});

  const quizIdx = questionOrder[currentIndex];
  const quizPair = data[quizIdx].pair;
  const meaningIdx = meaningTargetIdx[quizIdx];
  const sentenceIdx = sentenceTargetIdx[quizIdx];
  const targetWord = quizPair[meaningIdx];
  const otherWord = quizPair[1 - meaningIdx];
  const sentenceTargetWord = quizPair[sentenceIdx];
  const sentenceOtherWord = quizPair[1 - sentenceIdx];

  // Shuffle sentence options order on first render and when moving to a new question
  useEffect(() => {
    // On first entering a new question in sentence stage, shuffle and store options if not already present
    if (stage === 'sentence' && sentenceOptionsOrder[quizIdx] === undefined) {
      const quizPair = data[quizIdx].pair;
      const sentenceIdx = sentenceTargetIdx[quizIdx];
      const sentenceTargetWord = quizPair[sentenceIdx];
      const sentenceOtherWord = quizPair[1 - sentenceIdx];
      const options = [
        { word: sentenceTargetWord.word, isCorrect: true },
        { word: sentenceOtherWord.word, isCorrect: false },
      ];
      shuffleArray(options);
      setSentenceOptionsOrder((prev) => ({ ...prev, [quizIdx]: options }));
    }
    // Reset feedback/explanation when moving to a new question or stage
    if (stage === 'meaning' || (stage === 'sentence' && feedback && feedback.includes('சரியான'))) {
      setFeedback(null);
      setExplanation(null);
      setDisableOptions(false);
      setNextEnabled(false);
      setCountdown(3);
      setSelectedIdx(null); // Reset selectedIdx
    }
  }, [stage, quizIdx, data, sentenceTargetIdx, sentenceOptionsOrder]);

  // Add a ref to store the utterance so it can be stopped if needed
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (feedback && feedback.includes('சரியான') && stage === 'sentence') {
      setNextEnabled(false);
      setCountdown(3);
      let interval: NodeJS.Timeout;
      interval = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(interval);
            setNextEnabled(true);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [feedback, stage]);

  if (currentIndex >= questionOrder.length) {
    return (
      <div className="text-center space-y-4">
        <div className="text-2xl font-bold">All questions completed!</div>
        <button className="btn btn-primary" onClick={() => onComplete(true)}>
          Finish Quiz
        </button>
      </div>
    );
  }

  // Add a function to play the pronunciation for the current sentence
  const handlePronunciation = () => {
    let sentence = "";
    if (stage === 'meaning') {
      sentence = targetWord.sentence;
    } else {
      sentence = sentenceTargetWord.sentence;
    }
    if (sentence) {
      const utterance = new window.SpeechSynthesisUtterance(sentence);
      utterance.lang = "ta-IN";
      utterance.rate = 0.95;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
      utteranceRef.current = utterance;
    }
  };


  // Meaning choice stage
  if (stage === 'meaning') {
    const options = [
      { text: targetWord.meaning, isCorrect: true },
      { text: otherWord.meaning, isCorrect: false },
    ];
    shuffleArray(options);
    return (
      <div className="w-full max-w-xl mx-auto space-y-6">
        <div className="text-xl font-bold text-blue-700 mb-2">Part 1 : English Meaning</div>
        <div className="text-lg font-semibold bg-blue-50 p-4 rounded">
          {targetWord.word} <br />
        </div>
        <div className="text-base text-gray-600 whitespace-pre-line">
          {quizPair.map(item => `"${item.word}" (${item.meaning}): ${item.sentence}`).join('\n')}
        </div>
        <div className="flex flex-col gap-3">
          {options.map((opt, i) => (
            <button
              key={i}
              className={`p-3 rounded border text-left transition-all
                ${selectedIdx === i && !opt.isCorrect ? 'border-red-500 bg-red-50 text-red-700' : ''}
                ${feedback && opt.isCorrect ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300'}
                ${disableOptions ? 'opacity-60' : 'hover:bg-blue-100'}`}
              disabled={disableOptions && opt.isCorrect}
              onClick={() => {
                setSelectedIdx(i);
                if (opt.isCorrect) {
                  setFeedback('சரியான பதில்! (Correct Answer!)');
                  setExplanation(`சரியான பதில்! '${targetWord.word}' என்பதற்கு '${targetWord.meaning}' என்பதே சரியான ஆங்கிலப் பொருள்.`);
                  setDisableOptions(true);
                  setTimeout(() => {
                    setStage('sentence');
                    setFeedback(null);
                    setExplanation(null);
                    setDisableOptions(false);
                  }, 1200);
                } else {
                  setFeedback('தவறான பதில். மீண்டும் முயற்சிக்கவும். (Wrong Answer. Please try again.)');
                  setExplanation(`'${targetWord.word}' என்பதற்கு '${targetWord.meaning}' என்பதே சரியான ஆங்கிலப் பொருள்.`);
                  // Do not disable options, allow retry
                }
              }}
            >
              {opt.text}
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`mt-4 p-3 rounded ${feedback.includes('சரியான') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{feedback}</div>
        )}
        {explanation && (
          <div className="text-sm text-gray-600 whitespace-pre-line">{explanation}</div>
        )}
      </div>
    );
  }

  // Sentence completion stage
  let sentenceOptions: { word: string; isCorrect: boolean }[];
  if (sentenceOptionsOrder[quizIdx]) {
    sentenceOptions = sentenceOptionsOrder[quizIdx];
  } else {
    sentenceOptions = [
      { word: sentenceTargetWord.wordInSentence || sentenceTargetWord.word, isCorrect: true },
      { word: sentenceOtherWord.wordInSentence || sentenceOtherWord.word, isCorrect: false },
    ];
    shuffleArray(sentenceOptions);
    setSentenceOptionsOrder((prev) => ({ ...prev, [quizIdx]: sentenceOptions }));
  }
  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
    <div className="text-xl font-bold text-blue-700 mb-2">Part 2 : Fill in the Blanks</div>
      <div className="text-lg font-semibold bg-blue-50 p-4 rounded">
        {sentenceTargetWord.blankedSentence}
      </div>
      <div className="flex flex-col gap-3">
        {sentenceOptions.map((opt, i) => (
          <button
            key={i}
            className={`p-3 rounded border text-left transition-all ${disableOptions ? 'opacity-60' : 'hover:bg-blue-100'} ${feedback && opt.isCorrect ? 'border-green-500' : 'border-gray-300'}`}
            disabled={disableOptions}
            onClick={() => {
              if (opt.isCorrect) {
                setFeedback('சரியான பதில்! (Correct Answer!)');
                setExplanation(sentenceTargetWord.sentenceExplanationCorrect + '\n\n' +
                  quizPair.map(item => `"${item.word}" (${item.meaning}): ${item.sentence}`).join('\n'));
                setDisableOptions(true);
              } else {
                setFeedback('தவறான பதில். மீண்டும் முயற்சிக்கவும். (Wrong Answer. Please try again.)');
                setExplanation(sentenceTargetWord.sentenceExplanationWrong);
              }
            }}
          >
            {opt.word}
          </button>
        ))}
      </div>

      {explanation && (
        <div className="text-base text-gray-600 whitespace-pre-line">{explanation}</div>
      )}

      {feedback && (
        <div className={`mt-4 p-3 rounded ${feedback.includes('சரியான') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{feedback}</div>
      )}
  
      {feedback && feedback.includes('சரியான') && (
        <button
          className={`mt-4 px-6 py-2 border-2 border-blue-600 rounded font-semibold transition-all bg-white text-blue-700 disabled:opacity-60 disabled:cursor-not-allowed`}
          disabled={!nextEnabled}
          onClick={() => {
            if (currentIndex < questionOrder.length - 1) {
              setCurrentIndex(currentIndex + 1);
              setStage('meaning');
              setFeedback(null);
              setExplanation(null);
              setDisableOptions(false);
              setNextEnabled(false);
              setCountdown(3);
              // Remove sentence options for next question so it will be reshuffled
              setSentenceOptionsOrder((prev) => {
                const copy = { ...prev };
                delete copy[questionOrder[currentIndex + 1]];
                return copy;
              });
            } else {
              onComplete(true);
            }
          }}
        >
          {nextEnabled ? 'அடுத்த கேள்வி (Next Question)' : `அடுத்த கேள்வி (${countdown})`}
        </button>
      )}
      <div className="flex justify-center">
        <Button variant="learning-secondary" size="lg" onClick={handlePronunciation}>
          <Volume2 className="w-4 h-4 mr-2" />
          Hear Pronunciation
        </Button>
      </div>
    </div>
  );


};
