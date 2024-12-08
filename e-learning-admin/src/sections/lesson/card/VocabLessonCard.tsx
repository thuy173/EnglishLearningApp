import Picture from '@/components/common/Picture';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label';
import { VocabRes } from '@/models/vocabulary'
import { Trash2 } from 'lucide-react';
import React from 'react'

type Props = {
    vocab: VocabRes;
}

const VocabLessonCard: React.FC<Props> = ({ vocab }) => {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-xl mb-1">{vocab.word}</CardTitle>
                    <CardDescription>{vocab.ipa}</CardDescription>
                </div>
                <div className="flex gap-1">
                    <Button
                        size="icon"
                        className='text-red-500 bg-red-500/20 hover:text-white hover:bg-red-500'
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Picture
                    src={vocab.image}
                    alt={vocab.word}
                    className="w-full h-32 object-contain border rounded-md"
                />
                <div className="space-y-2">
                    <div>
                        <Label className="text-sm text-gray-500">Meaning</Label>
                        <p>{vocab.meaning}</p>
                    </div>
                    <div>
                        <Label className="text-sm text-gray-500">Definition</Label>
                        <p className="text-sm">{vocab.definition}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default VocabLessonCard