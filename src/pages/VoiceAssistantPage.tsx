import React, { useState, useEffect } from 'react';
import { ArrowRight, Mic, MicOff, Volume2, VolumeX, Brain } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Button from '../components/UI/Button';
import { useApp } from '../context/AppContext';
import { generateResponse } from '../services/ai';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceAssistantPage: React.FC = () => {
  const { isSpeaking, startSpeaking, stopSpeaking } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversation, setConversation] = useState<{ text: string; isUser: boolean }[]>([]);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.log('Browser doesn\'t support speech recognition.');
    }
  }, [browserSupportsSpeechRecognition]);

  const handleStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: 'ar-SA' });
  };

  const handleStopListening = async () => {
    SpeechRecognition.stopListening();
    if (transcript) {
      setConversation(prev => [...prev, { text: transcript, isUser: true }]);
      setIsProcessing(true);
      
      try {
        const response = await generateResponse(transcript);
        setConversation(prev => [...prev, { text: response, isUser: false }]);
        startSpeaking(response);
      } catch (error) {
        console.error('Error getting AI response:', error);
      } finally {
        setIsProcessing(false);
      }
      
      resetTranscript();
    }
  };

  return (
    <div className="md:mr-64 min-h-screen bg-gradient-to-b from-secondary-50 to-primary-50">
      <Navbar />
      
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            icon={<ArrowRight className="w-5 h-5" />}
            onClick={() => window.history.back()}
            className="ml-3"
          />
          <h1 className="text-2xl font-bold text-secondary-500">المساعد الصوتي</h1>
          
          <div className="mr-auto">
            <Button
              variant="ghost"
              onClick={() => isSpeaking ? stopSpeaking() : null}
              icon={isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-center mb-8">
            <div className={`relative w-32 h-32 rounded-full ${
              listening || isProcessing ? 'bg-primary-100 animate-pulse' : 'bg-primary-50'
            } flex items-center justify-center`}>
              <Brain className={`w-16 h-16 ${
                listening || isProcessing ? 'text-primary-600' : 'text-primary-400'
              }`} />
              {(listening || isProcessing) && (
                <div className="absolute inset-0 border-4 border-primary-500 rounded-full animate-ping" />
              )}
            </div>
          </div>
          
          <div className="space-y-4 mb-8 min-h-[200px] max-h-[400px] overflow-y-auto">
            {conversation.map((item, index) => (
              <div
                key={index}
                className={`flex ${item.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-xl px-4 py-3 ${
                  item.isUser
                    ? 'bg-primary-500 text-white rounded-br-none'
                    : 'bg-secondary-50 rounded-bl-none'
                }`}>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
            
            {listening && transcript && (
              <div className="flex justify-end">
                <div className="max-w-[80%] bg-primary-100 text-primary-800 rounded-xl px-4 py-3 animate-pulse">
                  {transcript}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-center">
            <Button
              variant={listening ? 'danger' : 'primary'}
              size="lg"
              onClick={listening ? handleStopListening : handleStartListening}
              icon={listening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              className="rounded-full w-16 h-16 p-0 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-secondary-500">تعليمات الاستخدام</h2>
          <ul className="space-y-2 text-secondary-400">
            <li className="flex items-center">
              <Mic className="w-4 h-4 ml-2 text-primary-500" />
              اضغط على زر الميكروفون لبدء المحادثة
            </li>
            <li className="flex items-center">
              <MicOff className="w-4 h-4 ml-2 text-primary-500" />
              اضغط مرة أخرى لإنهاء التسجيل
            </li>
            <li className="flex items-center">
              <Volume2 className="w-4 h-4 ml-2 text-primary-500" />
              سأقوم بالرد عليك صوتياً
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistantPage;