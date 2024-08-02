package com.everstarbackmain.domain.pet.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPersonality is a Querydsl query type for Personality
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPersonality extends EntityPathBase<Personality> {

    private static final long serialVersionUID = -1679296959L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPersonality personality = new QPersonality("personality");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    public final StringPath personalityValue = createString("personalityValue");

    public final QPet pet;

    public QPersonality(String variable) {
        this(Personality.class, forVariable(variable), INITS);
    }

    public QPersonality(Path<? extends Personality> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPersonality(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPersonality(PathMetadata metadata, PathInits inits) {
        this(Personality.class, metadata, inits);
    }

    public QPersonality(Class<? extends Personality> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.pet = inits.isInitialized("pet") ? new QPet(forProperty("pet"), inits.get("pet")) : null;
    }

}

