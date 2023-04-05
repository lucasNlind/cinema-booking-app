import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    cast: Array<string>;

    @Prop({ required: true })
    director: string;

    @Prop({ required: true })
    producer: string;

    @Prop({ required: true })
    summary: string;

    @Prop({ required: true })
    reviews: Array<string>;

    @Prop({ required: true })
    moviePosterUrl: string;

    @Prop({ required: true })
    trailerUrl: string;

    @Prop({ required: false })
    showDates: Array<number>;

    @Prop({ required: true })
    rating: string;

}

export const MovieSchema = SchemaFactory.createForClass(Movie);
