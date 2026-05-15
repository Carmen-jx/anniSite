-- Run this in Supabase SQL Editor after creating a new project

-- 1. Create the letters table
CREATE TABLE public.letters (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    title text NOT NULL,
    content text NOT NULL,
    published boolean DEFAULT false
);

ALTER TABLE public.letters OWNER TO postgres;
ALTER TABLE public.letters ENABLE ROW LEVEL SECURITY;

-- 2. Create policies
CREATE POLICY "Admin can manage all messages" ON public.letters USING ((auth.role() = 'authenticated'::text));
CREATE POLICY "Anyone can view visible messages" ON public.letters FOR SELECT USING ((published = true));

-- 3. Restore data
INSERT INTO public.letters (id, created_at, title, content, published) VALUES (
  'e3e3e85b-cee6-406a-b2bb-4cac20cf6df9',
  '2025-10-04 16:39:23.60244+00',
  'Happy Three Year Anniversary',
  'Dear Trevor,\n\nBefore we start… I will apologize in advance for my  ‘bad English’ but please bear with me. I’m sure you can foreshadow the amount of ‘cringe’ vomit you’ll read in this ‘heartfelt’ letter, hence comes my second apology... Sorry. I, myself, am not one who enjoys the idea of ‘cringe’ content; however, it may not be bad to be ‘cringey’ once in a while for you. So here’s my love letter:\n\nEnglish is not my forte. A consensus everyone I know agrees on. But I’m not here to prove my writing capability, that’s for a different day. Right now, I’m sitting here in the most uncomfortable, back breaking cheap pleather seat, typing this thousands of km above ground with one goal in mind: how to tell you ‘I love you ‘ in my own words. And I’m stuck. Not because of my limited vocabulary but it’s simply mission impossible. One cannot simply put a definition, a sentence, a prose on how I feel about you. How can I limit my emotions, sentiments, memories shared with you into measly words of nouns, adjectives and verbs? I fear even the word ‘love’ is too stingy for what we have with each other. If I can go beyond interstellar and transcend into the 6th dimension, then perhaps I can show you how much I love and care for you. Unfortunately, reality can only provide so much delusion so I will try my best and give this letter a shot.\n\nThank you for the past 3 years. Our relationship always had its ups and down, but we stood right by each other through every obstacle and achievements. And for that, I will always be thankful for. Sometimes I question myself, how is it possible for me to find someone as lovable as you? I must’ve used up all my luck and past life’s karma meeting you, and that’s okay. I will gladly give up all my luck each lifetime if it means I can love you all over again. Never had I ever believed in reincarnation so deeply after meeting you. And I pray it does because one lifetime is not enough to love you. In our every reincarnation, no matter what forms we are in, I will always find a way to love you again.\n\nSometimes I’m afraid. Afraid that I’m not good enough for you. You are far too intelligent, ambitious and hardworking to suit someone as lazy and slow as I am. But my love for you is selfish. I cannot allow a life without ‘us’, so let’s compromise. For you who’s confident and proud, let me be your shadow who follows behind you as you step into the light. If you are the stars when night falls, let me the dark sky painting the background for you to twinkle in. If you are the sun giving energy to life, let me be your moon to balance out the life. If you’re feeling lost, let me be your map who’ll guide to back home safely. If you’re cold, let me be the blanket that wraps around you providing warmth. If you’re hot, let me be the fan cooling away all your discomfort. If you’re tired, let me be the bed you lay upon to rest and recharge. If you’re sad, let me be the shoulder you lean on for comfort and security. And if you are you, then let me be me, the me who loves you dearly.\n\nEvery anniversary is a reminder of the many years we have a head of us. A mark of a new year for our love to grow and foster. And in the future, there will come a time when I’m old and wrinkly, my bones brittle, and breath so weak I can no longer profess my love to you; remember that my heart will still be beating the same as the 22-year-old Carmen who fell in love with you.\n\nLove,\nCarmen',
  true
);
