---
layout: post
title: Formally verified tablebase generator in Coq
---

This post details my efforts to construct a formally verified endgame tablebase generator for certain classes of two-player combinatorial games. You can view the code [here](https://github.com/emarzion/coqtbgen).  I generated a sample tablebase for a simple game known as a [bear game](https://en.wikipedia.org/wiki/Bear_games), and made a small frontend where you can query this tablebase and play games against it [here](https://emarzion.github.io/coqtbgen/).

# Table of contents

  * [Intro](#intro)
  * [Retrograde analysis](#retrograde-analysis)
  * [Coq formalization](#coq-formalization)
    - [Two-player games](#two-player-games)
    - [Wins, draws, strategies](#wins-draws-strategies)
    - [Creating the certified tablebase](#creating-the-certified-tablebase)
    - [Bear game frontend](#bear-game-frontend)
  * [Work to be done](#work-to-be-done)

# Intro

For many types of games, [endgame tablebases](https://en.wikipedia.org/wiki/Endgame_tablebase) are capable of determining if certain positions are won by a player or drawn, as well as how long it takes for the winning player to achieve victory assuming perfect play by both sides (this is typically known as depth to mate or DTM).  First conceived by Richard Bellman in 1965, the idea behind the construction (known as retrograde analysis) has most successfully been applied to the study of chess endgames, where it has revolutionized players' understandings of various classes of endgame positions.

Formally verified endgame tablebases were first investigated by Joe Hurd in [_Formal Verification of Chess Endgame Databases_](https://www.gilith.com/papers/chess.pdf), where he constructed endgame tablebases for chess using [HOL4](https://en.wikipedia.org/wiki/HOL_(proof_assistant)) equipped with a [BDD](https://en.wikipedia.org/wiki/Binary_decision_diagram) engine.  For this project, we investigated how to write a tablebase generator in Coq using an unabashed dependently-typed style, using codata to express things like draws and strategies.

# Retrograde analysis

Before we explain the idea of retrograde analysis, let us introduce a bit of notation. Given a position $s$ in some game, let $\mathsf{Move}(s)$ denote its set of legal moves. If $m \in 
\mathsf{Move}(s)$ we let $s \cdot m$ be the resulting position after playing $m$. We will let $\mathsf{Mate}(n,p)$ denote the set of positions which are DTM $n$ for player $p$.

The key observation of retrograde analysis is that we can compute $\mathsf{Mate}(n+1,p)$ from $\mathsf{Mate}(0,p),\ldots,\mathsf{Mate}(n,p)$ by observing that for some $s \not\in \bigcup_{k \leq n} \mathsf{Mate}(k,p)$,

  * If it is $p$'s turn at $s$, then $s \in \mathsf{Mate}(n+1,p) \iff \exists m \in \mathsf{Move}(s), s \cdot m \in \mathsf{Mate}(n,p)$.
  * If it is $p$'s opponent's turn at $s$, then $s \in \mathsf{Mate}(n+1,p) \iff \forall m \in \mathsf{Move}(s), \exists k \leq n, s \cdot m \in \mathsf{Mate}(k,p)$.

Naively, this requires scanning the entire space of positions each round, but in practice we can reduce the candidate $s$'s by computing "backward moves" from those positions we've just determined are in $\mathsf{Mate}(n,p)$.  Let $\mathsf{Back}(s) = \lbrace s' \vert \exists m \in \mathsf{Move}(s'), s' \cdot m = s \rbrace$. Our discussion suggests the following algorithm, assuming we've just computed $\mathsf{Mate}(n,p)$:

  * Collect the positions $\lbrace s' \vert \exists s \in \mathsf{Mate}(n,p), s' \in \mathsf{Back}(s) \rbrace$
  * Filter out all those that already belong to $\mathsf{Mate}(k,p)$ for some $k \leq n$.
  * For each remaining $s'$,
    - if it's $p$'s turn, then $s' \in \mathsf{Mate}(n+1,p)$ (we will call this an __Eloise step__)
    - if it's $p$'s opponent's turn, then for every $m \in \mathsf{Move}(s')$, check if $s' \cdot m \in \bigcup_{k \leq n} \mathsf{Mate}(k,p)$.  If this hold for all $m$, then $s' \in \mathsf{Mate}(n+1,p)$ (we will call this an __Abelard step__)

We can see that the key ingredients of this algorithm are:

  * A listing of $\mathsf{Mate}(0,p)$
  * A listing of $\mathsf{Move}(s)$
  * A listing of $\mathsf{Back}(s)$

Now we should mention that we will be working within a constructive mathematical framework (formally, Coq; informally, Bishop-style mathematics).  With this in mind, note that this algorithm implicitly assumes a couple of things about our game:

  * $\mathsf{Mate(0,p)}$ is decidable (reasonable, since the players would probably like to know whether or not the game is over)
  * the numbers of moves and backwards moves are finite (or else the $\exists/\forall$ quantifiers for the Eloise/Abelard steps would not be decidable)
  * the set of all positions is finite (or else this procedure could continue indefinitely)

# Coq formalization

Now that we've covered the mathematical ideas behind the algorithm, let's get into some of the specifics of our formalization.

## Two-player games

Here is our notion of a game:

```coq
Record Game : Type := {
  (* the game state type *)
  GameState : Type;
  (* the type of moves in a given state *)
  Move : GameState -> Type;

  (* whose turn it is in a given state *)
  to_play : GameState -> Player;
  (* the resulting state after making a given move *)
  exec_move : forall {b}, Move b -> GameState;
  (* the atomic result of a position, if any *)
  atomic_res : GameState -> option Result;
  (* a listing of all moves *)
  enum_moves : forall b, list (Move b);

  (* enum_moves enumerates all moves *)
  enum_all : forall {b} (m : Move b),
    In m (enum_moves b);
  (* play alternates between Black and White *)
  to_play_exec_move : forall b (m : Move b),
    to_play (exec_move m) = opp (to_play b);
  (* if the game is over, there are no moves *)
  atomic_res_nil : forall b res,
    atomic_res b = Some res -> enum_moves b = nil;
  (* if there are no moves, the game is over *)
  nil_atomic_res : forall b,
    enum_moves b = nil -> exists res, atomic_res b = Some res
  }.
```

`Result` is the following type:

```coq
Inductive Result : Type :=
  | Win : Player -> Result
  | Draw : Result.
```

Therefore, `atomic_res = Some (Win p)` means that player `p` has won (in Chess, this would mean `p` won by checkmate); `atomic_res = Some Draw` means that the game has ended in a draw (in Chess this would be a stalemate); and `atomic_res = None` means that the game is ongoing.

`atomic_res_nil` and  `nil_atomic_res` are perhaps not strictly necessary but are there more for "hygienic" purposes. They say the game ends if and only if there are no legal moves.

Based on what we discussed above, we need a few more assumptions about the games we use to generate tablebases:

```coq
Class FinGame (G : Game) : Type := {
  enum_states : list (GameState G);
  enum_wins : Player -> list (GameState G);

  enum_states_correct : forall s, In s enum_states;
  enum_wins_correct1 : forall s pl,
    In s (enum_wins pl) -> atomic_res s = Some (Win pl);
  enum_wins_correct2 : forall s pl,
    atomic_res s = Some (Win pl) -> In s (enum_wins pl)
  }.

Class Reversible (G : Game) : Type := {
  enum_preds : GameState G -> list (GameState G);

  enum_preds_correct1 : forall s s' : GameState G,
    In s (enum_preds s') -> {m : Move s & exec_move s m = s'};
  enum_preds_correct2 : forall (s : GameState G)
    (m : Move s), In s (enum_preds (exec_move s m))
  }.
```

These tell us that the game has finitely many states and that backward moves can be reasonably computed.

Lastly, we add one final assumption on our game:

```coq
Class NiceGame (G : Game) : Prop := {
  atomic_win_opp : forall (s : GameState G) pl,
    atomic_res s = Some (Win pl) ->
    to_play s = opp pl
  }.
```

This basically says that the final winning move is always played by the winning player.  For instance, in chess, the checkmating player always makes the final move. This assumption is not necessary to create tablebases, but it is convenient if we are interested in chess-like games.

## Wins, draws, strategies

With games defined, we are ready to define what it means for a position to be winning or drawn.  While these would naturally be considered as predicates (i.e. in `Prop`) we will define them in `Type`, since we will need to extract computational content (such as strategies or DTM).

Here's our definition of wins:

```coq
Inductive win {G : Game} (p : Player) : GameState G -> Type :=
  (* the base case *)
  | atom_win : forall b,
      atomic_res b = Some (Win p) ->
      win p b
  (* if it is the winning player's turn, they need to select one move and have a winning strategy for the resulting position *)
  | eloise_win : forall b,
      atomic_res b = None ->
      to_play b = p ->
      forall m, win p (exec_move b m) ->
      win p b
  (* if it is the losing player's turn, the winning player needs a winning strategy for any move their opponent makes *)
  | abelard_win : forall b,
      atomic_res b = None ->
      to_play b = opp p ->
      (forall m, win p (exec_move b m)) ->
      win p b.
```

Since we wish to encode not just the winner, but also DTM, we need a notion of depth to mate.  One might be tempted to include this information in the inductive type (i.e. something like `win_N` with an additional `nat` parameter in place of `win`), but in our experience this approach proves too complicated (especially when trying to add negative information like "...and there are no shorter paths to victory") so we choose a "plain" inductive with additional information attached later.  Here is our function that computes the depth of a win:

```coq
Fixpoint depth {G} {p} {s : GameState G} (w : win p s) : nat :=
  match w with
  | atom_win _ => 0
  | eloise_win _ _ _ w' => S (depth w')
  | @abelard_win _ _ s _ _ ws => S (list_max
      (map (fun m => depth (ws m)) (enum_moves s)))
  end.
```

From there, the definition of a smallest win is standard:

```coq
Definition minimal {G} {p} {s : GameState G} (w : win p s) : Prop :=
  forall (w' : win p s), depth w <= depth w'.
```

and finally, our definition of DTM:

```coq
Definition mate {G} (p : Player) (s : GameState G) (n : nat) : Type :=
  { w : win p s & depth w = n /\ minimal w }.
```

Onward to draws.  It might seem natural to simply define draws as positions that are not won; as we will want to extract informative content (the actual drawing moves), a more "positive" definition is required.  Intuitively, draws also have an element of self-reference ("a position is drawn if the player has a move leading to a drawn position...") but an inductive definition will not work:  draws need not have base cases in the same way that wins do.  Indeed, draws typically involve cycling between positions ad infinitum (in chess, one uses phrases like "draw by repetition" or "perpetual check" in situations like this).  And if one starts thinking of things like cyclical and potentially infinite data, then coinduction is probably the right idea:

```coq
CoInductive draw {G : Game} : GameState G -> Type :=
  (* an atomic case, representing things like stalemates in chess *)
  | atom_draw : forall s,
      atomic_res s = Some Draw ->
      draw s
  (* if there is at least one move that leads to a drawn position, and every move leads to either a drawn position or a lost position for current player, then the position is drawn *)
  | play_draw : forall s p,
      to_play s = p ->
      atomic_res s = None ->
      (forall m, draw (exec_move s m) + win (opp p) (exec_move s m)) ->
      forall m, draw (exec_move s m) ->
      draw s.
```

Finally, we would like a neutral type that represents an arbitrary player (could be winning, losing, drawn, or unknown) that we can play against.  Since games can always last infinitely long, coinduction is again the right choice:

```coq
CoInductive strategy {G : Game} (p : Player) : GameState G -> Type :=
  (* the game is over, there is nothing to do *)
  | atom_strategy : forall b res,
      atomic_res b = Some res -> strategy p b
  (* if it's your turn, a strategy is a move selection followed by a strategy for the resulting position *)
  | eloise_strategy : forall b,
      to_play b = p -> forall m,
      strategy p (exec_move b m) -> strategy p b
  (* if it's your opponent's turn, a strategy is a collection of strategies any potentially resulting position *)
  | abelard_strategy : forall b,
      to_play b = opp p ->
      (forall m, strategy p (exec_move b m)) ->
      strategy p b.
```

## Creating the certified tablebase

The discussion on retrograde analysis we had earlier will now guide our development of the tablebase.  In broad strokes, we will be maintaining some intermediate state that is updated after each round, and terminate once this state stabilizes in some sense.

```coq
Record TB : Type := {
  (* number keeping track of what round we're in *)
  curr : nat;
  (* was the last step taken an Eloise step or Abelard step? *)
  last_step : Step;

  (* collections of positions that have been marked as wins, divided by whose turn it is *)
  white_positions : M (Player * nat);
  black_positions : M (Player * nat);

  (* the results of the last round, divided by whose turn it is *)
  last_white_positions : list (GameState G);
  last_black_positions : list (GameState G)
  }.
```

`M` represents a generic map-like structure with keys in `string`; the game positions are turned into the string keys before storage.  In practice, this is an opaque type that is postulated to behave correctly, and is extracted as OCaml's [map type](https://v2.ocaml.org/api/Map.S.html). We do however provide an implementation based on association lists in order to ensure our axioms are consistent.

We then create `TB_init : TB` and `TB_step : TB -> TB` which handle initialization and the logic that updates the state after each round.  Since there are only finitely many game states (because we assume `FinGame`), this loop will eventually stabilize, and at that point we terminate. We call the result `TB_final`.

This handles construction, but how to prove correctness? The structure of the proof typically mirrors the structure of the construction, so in this case we use a loop invariant.  If we can show that `TB_init` satisfies this invariant and that `TB_step` preserves it, we can then show that the final result also proves it.

Here is the property we used in our proof:

```coq
Record TB_valid (tb : TB) : Type := {

  (* some technical necessity arising from us using a generic map interface *)
  white_good : good (white_positions tb);
  black_good : good (black_positions tb);

  (* all mates below current round are already covered *)
  mate_tb : forall {s pl n},
    n < curr tb -> mate pl s n ->
    tb_lookup tb s = Some (pl, n);

  (* if a position s returns (pl,n), then s is mate in n for pl *)
  tb_mate : forall {s pl n},
    tb_lookup tb s = Some (pl, n) ->
    mate pl s n;

  (* stored mates are smaller than current round *)
  tb_small : forall {s pl n},
    tb_lookup tb s = Some (pl, n) ->
    n < curr tb;

  (* positions in white/black_positions are white/black to move *)
  tb_white : forall {s pl n},
    str_lookup s (white_positions tb) = Some (pl, n) ->
    to_play s = White;
  tb_black : forall {s pl n},
    str_lookup s (black_positions tb) = Some (pl, n) ->
    to_play s = Black;

  (* any win not found in the tablebase must have greater depth than current round *)
  tb_None : forall {s pl} (w : win pl s),
    tb_lookup tb s = None ->
    curr tb <= depth w;

  (* positions that are mate in curr_round are in last_white/black_positions *)
  mate_lwp : forall {s pl},
    to_play s = White ->
    mate pl s (curr tb) ->
    In s (last_white_positions tb);
  mate_lbp : forall {s pl},
    to_play s = Black ->
    mate pl s (curr tb) ->
    In s (last_black_positions tb);

  (* positions that are in last_white/black_positions are mate in curr_round *)
  lwp_mate : forall {s},
    In s (last_white_positions tb) ->
    mate (step_player (last_step tb) White) s (curr tb);
  lbp_mate : forall {s},
    In s (last_black_positions tb) ->
    mate (step_player (last_step tb) Black) s (curr tb);

  (* last_white/black_positions have no duplicates *)
  lwp_NoDup : NoDup (last_white_positions tb);
  lbp_NoDup : NoDup (last_black_positions tb);

  (* positions in last_white_black_positions are not yet in the tablebase *)
  lwp_disj : forall s, In s (last_white_positions tb) -> str_lookup s (white_positions tb) = None;
  lbp_disj : forall s, In s (last_black_positions tb) -> str_lookup s (black_positions tb) = None;

  (* it is always white/black's turn to play for positions in last_white/black_positions *)
  lwp_white : forall s, In s (last_white_positions tb) -> to_play s = White;
  lbp_black : forall s, In s (last_black_positions tb) -> to_play s = Black;
  }.
```

We then prove that `TB_init` satisfies `TB_valid` and `TB_step` preserves `TB_valid`.  This constitutes the majority of the proof effort and yields a proof `TB_final_valid : TB_valid TB_final`. From this, it is not too difficult to prove the following four theorems, that constitute our proof of correctness for `TB_final`:

```coq
Theorem TB_final_lookup_mate : forall s pl n,
  tb_lookup TB_final s = Some (pl, n) ->
  mate pl s n.

Theorem mate_TB_final_lookup : forall s pl n,
  mate pl s n ->
  tb_lookup TB_final s = Some (pl, n).

Theorem TB_final_lookup_draw : forall s,
  tb_lookup TB_final s = None ->
  draw s.

Theorem draw_TB_final_lookup : forall s,
  draw s ->
  tb_lookup TB_final s = None.
```

## Bear game frontend

To generate a sample tablebase, we chose a game known as a [Bear Game](https://en.wikipedia.org/wiki/Bear_games), a simple game from the Roman Empire.  The basic idea of this game is that the board is a graph (in practice it is always symmetric and irreflexive, but we do not require this) that 3 hunters and 1 bear move along.  The goal of the hunters is to "capture" the bear by surrounding it on all sides so that it is incapable of moving (pieces never come off the board and only one piece can occupy a vertex at a given time). The bear can only play to avoid capture (in real life play, there is typically a move limit placed on the hunter player beyond which the bear has won).

We created a game `BearGame : Graph -> Game` which is parametrized by the underlying board graph.  For our example, we chose a graph called a Roman wheel.  After verifying all the necessary properties of this game (`FinGame`, `NiceGame`, `Reversible`, etc.) we invoked our `TB_final` construction.  From there, we extracted our code to OCaml and used `js_of_ocaml` to build a small frontend to allow users to query the tablebase for certain positions and play against the optimal tablebase strategy.  This frontend can be found [here](https://emarzion.github.io/coqtbgen/).

# Work to be done

Ideally, we would like to generate chess endgame tablebases, but the approach taken with the bear game is not suitable, since it produces a single tablebase for the entire space of legal positions. Chess tablebases currently only exist for up to 7 pieces, and on the high end this involves heroic programming efforts and nontrivial computational resources. Therefore, a number of modifications will be necessary (though perhaps not sufficient) to make the problem tractable:

  * Allow for stratified tablebase generation, based on hereditarily closed properties (in the case of chess, material configurations such as King and Rook vs King and Knight, etc.)
  * Allow for modding out by symmetries (rotational, reflective, color) in order to reduce the number of positions considered
  * Use optimizations such as bitboards

Even with these changes, the approach this project takes in its current form is probably not feasible beyond four pieces.